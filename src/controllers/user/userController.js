const { User, Project } = require("../../db");

const userCreate = async (data) => {
    let { user_name, name, last_name, email, password, profile_img } = data
    const newUser = await User.create({
        user_name,
        name,
        last_name,
        email,
        password,
        profile_img
    });

    return {
        msg: "El usuario se creo con exito"
    };
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
    const infoDB = await User.findAll({
        where: {
            deletedAt: null
        }
    });

    console.log(infoDB);

    return infoDB.filter(user => user.dataValues.user_name.includes(user_name))
}

const userByID = async (userID) => {
    const infoUserDB = await User.findByPk(userID);
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

    /* const infoProjectDB = await Project.findAll({ where: { userId: userID } }) */

    return infoClean;
};

module.exports = {
    getAllUserByName,
    userCreate,
    getAllUsers,
    userByID,
};
