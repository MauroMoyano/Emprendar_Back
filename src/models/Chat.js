const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('chat', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
          usersender: {
               type: DataTypes.TEXT,
               allowNull: false,
          
          },
          userreceiver:{
               type: DataTypes.TEXT,
            allowNull: false,

          },
          message : {
               type: DataTypes.TEXT,
            allowNull: false,

          }
    }, { timestamps: false })
}