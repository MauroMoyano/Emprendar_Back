const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('usuarios', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        nombre: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        correo: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        password: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        /* estado, la posibilidad de que el usuario sea bloqueado o borrado por metodo logico */
        estado_cuenta: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },
        monto_donado: {
            type: DataTypes.DECIMAL,
            defaultValue: 0
        },
        monto_recibido: {
            type: DataTypes.DECIMAL,
            defaultValue: 0
        },
        reputacion: {
            type: DataTypes.DECIMAL,
            defaultValue: 0
        },
        /* el validado refiere a un link que tendria que ingresar
        el usuario una vez registrado para poder ingresar a la pagina */
        validado: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        imagen_perfil: {
            type: DataTypes.TEXT,
            /* default: poner <imagen> (link), a nube de imagen tipica de usuario sin foto de perfil */
            allowNull: false
        }
    }, { timestamps: false })
}