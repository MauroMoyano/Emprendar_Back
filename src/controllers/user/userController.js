const { User, Project } = require("../../db");

const userCreate = async (data) => {
    let { user_name, name, last_name, email, password, profile_img } = data
    if(!user_name || !name || !last_name || !email || !password || !profile_img){
      throw new Error("Por favor complete todos los campos");
    }else{
      const comparador = await User.findOne({where: {user_name: user_name}})

      if(comparador){
        throw new Error("Este nombre de usuario ya éxiste");
      }else{
        const newUser = await User.create({
          user_name,
          name,
          last_name,
          email,
          password,
          profile_img
        });
        console.log(newUser);
        return {
            msg: "El usuario se creo con exito"
        };
      }
    }

};

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
            email: user.dataValues.emale,
            account_state: user.dataValues.account_state,
            reputation: user.dataValues.reputation,
            validated: user.dataValues.validated,
            profile_img: user.dataValues.profile_img,
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
          email: user.emale,
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
        email: infoUserDB.emale,
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

  const updatedUser = await userFind.update(data);
  console.log(updatedUser);

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
};
