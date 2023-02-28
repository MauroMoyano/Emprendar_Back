const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('project', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        title: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        summary: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        /* decha de formato YYYY-MM-DD */
        date: {
            type: DataTypes.DATEONLY,
            defaultValue: Date.now() /* TODO FORMATEAR FECHA */
        },
        /* estado_proyecto: refiere a si aun está activo, en la parte de casos completado
        se mostrarian los proyectos con estado false (es decir, inactivos, porque se completaron) */
        project_state: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },
        goal: {
            type: DataTypes.DECIMAL,
            allowNull: false
        },
        amount_collected: {
            type: DataTypes.DECIMAL,
            defaultValue: 0
        },
        img: {
            type: DataTypes.TEXT
        },
        validated: {
            type: DataTypes.ENUM('aceptado', 'rechazado', 'espera'),
            defaultValue: 'espera'
        }
    }, { timestamps: false, paranoid:true }) //habilitar el borrado logico
}