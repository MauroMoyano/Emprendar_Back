const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "user",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      user_name: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true,
      },
      name: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      last_name: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      email: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      password: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      /* estado, la posibilidad de que el usuario sea bloqueado o borrado por metodo logico */
      /* comentado debido a que trabajamos con "paranoid" para el borrado lógico */
      /* account_state: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      }, */
      reputation: {
        type: DataTypes.DECIMAL,
        defaultValue: 0,
      },

      profile_img: {
        type: DataTypes.TEXT,
        /* default: poner <imagen> (link), a nube de imagen tipica de usuario sin foto de perfil */
        allowNull: false,
      },
      token: {
        type: DataTypes.STRING,
        defaultValue: ""
      },
      /* el validado refiere a un link que tendria que ingresar
        el usuario una vez registrado para poder ingresar a la pagina */
      confirmed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      /* TODO: esto haria referencia a que el usuario ha sido eliminado por parte del staff.
      si el usuario se dio de baja, puede volver a levantar su cuenta "mandando un token de confirmacion"
      dado el caso de que haya sido borrado por nosotros, el usuario, no tendra permitido volver a ingresar
      con este mismo email. */
      eliminatedByAdmin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      }
    },
    { paranoid: true }
  ); // habilitar el borrado logico
};