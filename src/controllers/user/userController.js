const { User } = require('../../db')


const UserCreate = async (name, email, password, profile_img) => {

    const newUser = await User.create({ name, email, password, profile_img });
    console.log(newUser);
    return "El usuario se creo con exito"
}

const getAllUsers = async ()=>{
    const infoDB = await User.findAll();
    const infoClean = {
        id: infoDB.id,
        name: infoDB.name,
        email: infoDB.emale,
        account_state: infoDB.account_state,
        reputation: infoDB.reputation,
        validate: infoDB.validate,
        profile_img: infoDB.profile_img,
    }
    
    return infoClean;
}

const UserByID = async (userID) => {
    const infoDB = await User.findByPk({where: {id: userID}})
    const infoClean = {
        id: infoDB.id,
        name: infoDB.name,
        email: infoDB.emale,
        account_state: infoDB.account_state,
        reputation: infoDB.reputation,
        validate: infoDB.validate,
        profile_img: infoDB.profile_img,
    }

    return infoClean;
}

module.exports = {
    UserCreate,
    getAllUsers,
    UserByID,
}