const { User, Proyect } = require("../../db");

const userCreate = async (name, email, password, profile_img) => {
    const newUser = await User.create({ name, email, password, profile_img });
    console.log(newUser);
    return {
        msg: "El usuario se creo con exito"
    };
};

const getAllUsers = async () => {
    const infoDB = await User.findAll();
    const infoClean = infoDB.map(user => {
        return {
            id: user.dataValues.id,
            name: user.dataValues.name,
            email: user.dataValues.emale,
            account_state: user.dataValues.account_state,
            reputation: user.dataValues.reputation,
            validated: user.dataValues.validated,
            profile_img: user.dataValues.profile_img,
        }
    });

    return infoClean;
};

const userByID = async (userID) => {
    const infoUserDB = await User.findByPk(userID);
    const infoUserClean = {
        id: infoUserDB.id,
        name: infoUserDB.name,
        email: infoUserDB.emale,
        account_state: infoUserDB.account_state,
        reputation: infoUserDB.reputation,
        validated: infoUserDB.validated,
        profile_img: infoUserDB.profile_img,
    };

    const infoProjectDB = await Proyect.findAll({where: {userId: userID}})

    return infoClean;
};

module.exports = {
    userCreate,
    getAllUsers,
    userByID,
};
