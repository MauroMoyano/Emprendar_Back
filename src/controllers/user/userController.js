const { emailRegistration } = require("../../../utils/emails");
const { generateToken } = require("../../../utils/generateToken");
const { generateJWT } = require("../../../utils/generateJWT");
const bcrypt = require("bcrypt")

const { User, Project } = require("../../db");
const userCreate = async (data) => {
    let { user_name, name, last_name, email, password, profile_img } = data
    if(!user_name || !name || !last_name || !email || !password || !profile_img){
      throw new Error("Por favor complete todos los campos");
    }else{
      const findUser = await User.findOne({where: {user_name: user_name}})

      if(findUser){
        throw new Error("Este nombre de usuario ya éxiste");
      }else{

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
            msg: "El usuario se creo con exito"
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

    if(!userToConfirm){
      throw new Error('Token no valido')
    }

    userToConfirm.token = ""
    userToConfirm.confirmed = true

    await userToConfirm.save()

    return 'Confirmado correctamente'
}


const authUser = async (data) => {

  const {email, password} = data

    //comprobar si el usuario existe

      const user = await User.findOne({
        where: {
          email
        }
      })

      if(!user) {
        throw new Error('No existe ningun usuario con este correo')
      }

      // comprobar si el usuario esta confirmado

        if(!user.confirmed) {
          throw new Error('Tu cuenta no a sido confirmada')
        }

        //comprobar password
        const passwordIsTheSame = bcrypt.compareSync(password, user.password)
        if(passwordIsTheSame) {


          const infoUser = {
            id: user.id,
            name: user.name,
            email:user.email,
            token: generateJWT(user.id)
          }


          return infoUser;
      
        } else {
          throw new Error('Password incorrecto')
        }

}

const getAllUsers = async () => {
    const infoDB = await User.findAll({
        where: {
            deletedAt: null
        }
    });
    const infoClean = infoDB.map(user => {
        return {
            id: user.dataValues.id,
            user_name: user.dataValues.user_name,
            name: user.dataValues.name,
            last_name: user.dataValues.last_name,
            email: user.dataValues.email,
            account_state: user.dataValues.account_state,
            reputation: user.dataValues.reputation,
            validated: user.dataValues.validated,
            profile_img: user.dataValues.profile_img,
            token: user.dataValues.token,
            confirmed: user.dataValues.confirmed
        }
    });

    return infoClean;
};

const getAllUserByName = async (user_name) => {

    if(!user_name){
      throw new Error("Por favor ingrese un Nombre de Usuario")
    }

    const infoDB = await User.findAll({
        where: {
            deletedAt: null
        }
    });

    if(!infoDB){
      throw new Error("No se encontró ningun Usuario")
    }else{

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

const userByID = async (userID) => {

  if(!userID){
    throw new Error("No se especificó el ID del usuario");
  }else{
    const infoUserDB = await User.findByPk(userID);
    if(!infoUserDB){
      throw new Error("No se encontró ningun usuario con ese ID")
    }else{
      const infoUserClean = {
        id: infoUserDB.id,
        user_name: infoUserDB.user_name,
        name: infoUserDB.name,
        last_name: infoUserDB.last_name,
        email: infoUserDB.email,
        account_state: infoUserDB.account_state,
        reputation: infoUserDB.reputation,
        validated: infoUserDB.validated,
        profile_img: infoUserDB.profile_img,
      };

      const infoProjectDB = await Project.findAll({ where: { userId: userID } })

      const infoMixed = {...infoUserClean, userProjects: infoProjectDB}

      return infoMixed;
    }
    
  }
   
};


const updateUser = async (id, data) => {
  const userFind = await User.findByPk(id);
  if(!userFind) throw new Error('No se encontró el usuario');

  let { user_name, name, last_name, profile_img, email, password } = data;


  if(user_name) userFind.user_name = user_name;
  if(name) userFind.name = name;
  if(last_name) userFind.last_name = last_name;
  if(profile_img) userFind.profile_img = profile_img;
  if(email) userFind.email = email;
  if(password){
    const passwordHash = await bcrypt.hash(password, 8);
    userFind.password = passwordHash;
  }
  await userFind.save()
  // const updatedUser = await userFind.update(data);
  console.log(userFind);

  return {msg: 'Usuario actualizado correctamente'};
}


const deleteUser = async (userID) =>{
  if(!userID){
    throw new Error("No se asigno un ID");
  }else{
    const userFind = await User.findOne({ where: { id: userID }});
    if(!userFind){
      throw new Error("No se encontró el usuario");
    }else{
      await User.destroy({ where: { id: userID }})

      return {
        msg: 'Usuario Eliminado Correctamente'
      }
    }
    
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
    authUser
};
