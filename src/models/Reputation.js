const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('Reputation', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        userQualifier: {
            type: DataTypes.UUID,
            allowNull: false
        },
        qualifiedUser: {
            type: DataTypes.UUID,
            allowNull: false
        },
        qualification: {
            type: DataTypes.ENUM("1", "2", "3", "4", "5", "6", "7", "8", "9", "10"),
            allowNull: false
        }
    })
}