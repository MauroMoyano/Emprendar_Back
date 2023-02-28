const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('comment', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        id_user: {
            type: DataTypes.UUID,
            allowNull: false,
            /* references: {
                model: 'Users',
                key: 'id'
            } */
        },
        id_proyect: {
            type: DataTypes.UUID,
            allowNull: false,
            /* references: {
                model: 'Proyect',
                key: 'id'
            } */
        },
        comment: {
            type: DataTypes.TEXT,
            allowNull: false
        },
    }, { paranoid: true }) //habilitar el borrado logico
}