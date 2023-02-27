const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('comentario', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        id_usuario: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: 'usuarios',
                key: 'id'
            }
        },
        id_proyecto: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: 'proyectos',
                key: 'id'
            }
        },
        comentario: {
            type: DataTypes.TEXT,
            allowNull: false
        },
    }, { timestamps: false })
}