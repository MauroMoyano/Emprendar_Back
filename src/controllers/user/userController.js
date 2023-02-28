const { User } = require("../../db");

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
    const infoDB = await User.findByPk(userID);
    console.log(infoDB)
    const infoClean = {
        id: infoDB.id,
        name: infoDB.name,
        email: infoDB.emale,
        account_state: infoDB.account_state,
        reputation: infoDB.reputation,
        validated: infoDB.validated,
        profile_img: infoDB.profile_img,
    };

    return infoClean;
};

module.exports = {
    userCreate,
    getAllUsers,
    userByID,
};
