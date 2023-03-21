const { emailRegistration, emailResetPassword } = require("../../../utils/emails");
const { generateToken } = require("../../../utils/generateToken");
const { generateJWT } = require("../../../utils/generateJWT");
const bcrypt = require("bcrypt")

const { User, Project, Country, Category, Reputation } = require("../../db");
const { Op } = require("sequelize");
const { getReputationUser } = require("../Reputation/reputarionController");

const userCreate = async (data) => {
  let { user_name, name, last_name, email, password, profile_img } = data
  if (!user_name || !name || !last_name || !email || !password || !profile_img) {
    throw new Error("Por favor complete todos los campos");
  } else {
    const findUser = await User.findOne({ where: { user_name: user_name } })
    const findEmail = await User.findOne({ where: { email: email } })

    if (findEmail) {
      throw new Error("Este correo electrónico ya está registrado");
    }
    if (findUser) {
      throw new Error("Este nombre de usuario ya existe");
    } else {

      password = await bcrypt.hash(password, 8);

      const newUser = await User.create({
        user_name,
        name,
        last_name,
        email,
        password,
        profile_img,
        token: generateToken()
      });

      emailRegistration({
        email: newUser.email,
        name: newUser.name,
        token: newUser.token
      })

      return {
        message: "El usuario se creó con éxito, revisa tu casilla de Email para confirmar"
      };
    }
  }

};


const confirmeUser = async (token) => {

  const userToConfirm = await User.findOne({
    where: {
      token: token
    }
  })

  if (!userToConfirm) {
    throw new Error('Token no valido')
  }

  userToConfirm.confirmed = true

  await userToConfirm.save()

  return { message: 'Confirmado correctamente' }
}


const authUser = async (data) => {

  const { email, password } = data

  //comprobar si el usuario existe

  const user = await User.findOne({
    where: {
      email
    }
  })

  if (!user) {
    throw new Error('No existe ningún usuario con este correo')
  }

  // comprobar si el usuario esta confirmado

  if (!user.confirmed) {
    throw new Error('Tu cuenta no ha sido confirmada')
  }

  //comprobar password
  const passwordIsTheSame = bcrypt.compareSync(password, user.password)
  if (passwordIsTheSame) {

    const infoUser = {
      id: user.id,
      user_name: user.user_name,
      name: user.name,
      last_name: user.last_name,
      email: user.email,
      token: generateJWT(user.id, user.user_name)
    }


    const infoProjectDB = await Project.findAll({ where: { userId: infoUser.id } })

    const infoMixed = { ...infoUser, userProjects: infoProjectDB }

    return infoMixed;


  } else {
    throw new Error('Password incorrecto')
  }

}


/* como bien lo dice, trae a todos los usuarios para una especie de "busqueda" de los perfiles de usuarios ademas de los "proyectos"
se le aplicaran "filtros" desde el front. exeptuanco la busqueda propia por back */
const getAllUsers = async (data, pageNum = 2) => {

  const { page, orden, search } = data

  let order
  orden
    ? order = [['user_name', orden]]
    : order = null

  let where1 = {}
  search
    ? where1.where = { confirmed: true, eliminatedByAdmin: false, deletedAt: null, user_name: { [Op.iLike]: `%${search}%` } }
    : where1.where = { confirmed: true, eliminatedByAdmin: false, deletedAt: null }

  let offset = (page - 1) * pageNum;
  let limit = pageNum;

  /* solo setea los numeros de coincidencia */
  const { count } = await User.findAndCountAll({
    offset,
    limit,
    order,
    where: where1.where,
  })
  /* retorna en rows los valores de las coincidencias */
  const { rows } = await User.findAndCountAll({
    offset,
    limit,
    order,
    where: where1.where,
    attributes: ['id', 'user_name', 'name', 'last_name'/* , 'reputation' */, 'profile_img']
  })

  let result = []
  for (const user of rows) {
    let project = await Project.findAll({ where: { userId: user.dataValues.id, validated: 'aceptado', deletedAt: null }, attributes: ['id', 'title',] })
    let reputation = await getReputationUser({ qualifiedUser: user.dataValues.id })
    result.push({
      ...user.dataValues,
      project,
      reputation
    })
  }


  console.log(result)

  return {
    data: result,
    pages: Math.ceil(count / pageNum),
  };
};


/* recibe un "user_name" por body e indagamos dentro de la tabla de usuarios que "incluya" el "user_name" */
const getAllUserByName = async (user_name) => {

  if (!user_name) {
    throw new Error("Por favor ingrese un nombre de usuario")
  }

  const infoDB = await User.findAll({
    where: {
      deletedAt: null
    }
  });

  if (!infoDB) {
    throw new Error("No se encontró ningún Usuario")
  } else {

    const infoSearch = infoDB.filter(user => user.dataValues.user_name.includes(user_name))

    const infoClean = infoSearch.map(user => {
      return {
        id: user.id,
        user_name: user.user_name,
        name: user.name,
        last_name: user.last_name,
        email: user.email,
        account_state: user.account_state,
        reputation: user.reputation,
        validated: user.validated,
        profile_img: user.profile_img,
      }
    });

    return infoClean;
  }
}


/* controler del back para mostrar el detalle del usuario junto con los respectivos proyectos que creo el mismo */
const userByID = async (userId) => {

  if (!userId) {
    throw new Error("No se especificó el ID del usuario");
  } else {
    const infoUserDB = await User.findByPk(userId);
    if (!infoUserDB) {
      throw new Error("No se encontró ningún usuario con ese ID")
    } else {
      const infoUserClean = {
        id: infoUserDB.id,
        user_name: infoUserDB.user_name,
        name: infoUserDB.name,
        last_name: infoUserDB.last_name,
        email: infoUserDB.email,
        account_state: infoUserDB.account_state,
        reputation: await (getReputationUser({ qualifiedUser: infoUserDB.id })).reputation,
        cantFeedBack: await (getReputationUser({ qualifiedUser: infoUserDB.id })).count,
        validated: infoUserDB.validated,
        profile_img: infoUserDB.profile_img,
      };

      const infoProjectDB = await Project.findAll({
        where: {
          userId
        }, include: [
          { model: Country, attributes: ['name'] },
          { model: Category, attributes: ['name'], through: { attributes: [] } },
        ]
      })

      const infoMixed = { ...infoUserClean, userProjects: infoProjectDB }

      return infoMixed;
    }

  }

};


/* cambio de valores por parte del usuario de su propio perfil.
TODO: ruta especifica con token para poder cambiar email y password, en caso de email, volver a hacer la confirmacion
es decir, el estado de confirmed debe volver a false. */
const updateUser = async (id, data) => {
  const userFind = await User.findByPk(id);
  if (!userFind) throw new Error('No se encontró el usuario');

  let { user_name, name, last_name, profile_img, email, password } = data;


  if (user_name) userFind.user_name = user_name;
  if (name) userFind.name = name;
  if (last_name) userFind.last_name = last_name;
  if (profile_img) userFind.profile_img = profile_img;
  if (email) userFind.email = email;
  if (password) {
    const passwordHash = await bcrypt.hash(password, 8);
    userFind.password = passwordHash;
  }
  await userFind.save()
  // const updatedUser = await userFind.update(data);

  return { msg: 'Usuario actualizado correctamente' };
}

/* este seria controlador que maneja el usuario para dar de baja el su perfil. */
const deleteUser = async (userID) => {
  if (!userID) {
    throw new Error("No se asignó un ID");
  } else {
    const userFind = await User.findOne({ where: { id: userID } });
    if (!userFind) {
      throw new Error("No se encontró el usuario");
    } else {
      await User.destroy({ where: { id: userID } })

      return {
        msg: 'Usuario eliminado correctamente'
      }
    }

  }
}


/* controladores para ADMINS. !!!!! */

/* pasamos a los Admins los datos del usuario
TODO: crear filtros por ciertos parametros de usuario, como deletedAt 
(con su instancia de usuario borrado. no se el valor que se le da con el destroy({<})) */
const getAllUserInfoAdmin = async () => {
  const infoDB = await User.findAll();
  const infoClean = infoDB.map(user => {
    return {
      id: user.dataValues.id,
      user_name: user.dataValues.user_name,
      name: user.dataValues.name,
      last_name: user.dataValues.last_name,
      email: user.dataValues.email,
      profile_img: user.dataValues.profile_img,
      confirmed: user.dataValues.confirmed,
      createdAt: user.dataValues.createdAt
    }
  });
  return infoClean;
};

/* estos controladores seran inplementados cuando contemos con tiempo muerto para poder explayarnos */

/* colocar el filtro de usuarios por valor de deletedAt() */
/* const getFilterUserInfoByDeletedAt = async (boolean) => {

  let users

  boolean
    ? users = await User.findAll()
    : 

} */

/* funcion que va directo para los Admins, que permite borrar al usuario y ademas que el usuario no tenga la posibilidad de
volver a recuperar la cuenta por la propiedad "eliminatedByAdmin"
TODO: handler y ruta de esta función.*/
 const deleteUserByAdmin = async (userId) => {
  let user = await User.findByPk(userId)

  user.eliminatedByAdmin = true
  user.account_state = false

  await user.save()

  if (user.deletedAt === null) {
    await User.destroy({ where: { id: userId } })
  }

  return { msg: 'usuario borrado con exito.' }
}



const resetPassword = async (email) => {
  const user = await User.findOne({ where: { email: email } })

  if (!user) {
    throw new Error('El usuario no existe')
  }

  user.token = generateToken()

  await user.save()
  //enviar email 
  emailResetPassword({
    email: user.email,
    name: user.name,
    token: user.token

  })

  return { msg: 'Enviamos el email con las instrucciones' }
}

const comprobarToken = async (token) => {

  const tokenValido = await User.findOne({ where: { token } });

  if (tokenValido) {
    return { msg: "Token valido y el usuario existe" }
  } else {
    throw new Error('Token invalido')
  }
}



const newPassword = async (token, password) => {

  const user = await User.findOne({ where: { token: token } })

  if (user) {
    user.password = await bcrypt.hash(password, 8);
    user.token = '';

    await user.save()

    return { msg: 'Contraseña cambiada correctamente' }
  } else {
    return ('Token no valido')
  }

}


const changePassword = async (id, password, newPassword, verifyPassword) => {

  const user = await User.findByPk(id)

  if (newPassword === verifyPassword) {
    const passwordIsTheSame = bcrypt.compareSync(password, user.password)

    if (passwordIsTheSame) {
      user.password = bcrypt.hash(newPassword, 8);

      await user.save()

      return { msg: 'Contraseña cambiada correctamente' }
    } else {
      throw new Error('Tu contraseña no coincide con la contraseña guardada en la base de datos')
    }
  } else {
    throw new Error('Las contraseñas deben ser iguales')

  }



}

module.exports = {
  getAllUserByName,
  userCreate,
  getAllUsers,
  userByID,
  deleteUser,
  updateUser,
  confirmeUser,
  authUser,
  /* los controladores de los admins */
  getAllUserInfoAdmin,
  deleteUserByAdmin,
  resetPassword,
  comprobarToken,
  /* a inplementar cuando tengamos terminado lo basico */
  /* getFilterUserInfoByDeletedAt,
  deleteUserByAdmin */
  newPassword,
  changePassword
};
