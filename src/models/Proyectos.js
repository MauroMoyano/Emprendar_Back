const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('proyectos', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        titulo: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        resumen: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        descipcion: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        /* creador, conexion con la tabla de usuario. creador = nombre
        pero esta instancia se define en otro lado. parte de rutas / controlers */
       /*  creador: {
            type: DataTypes.STRING
        }, */
        /* decha de formato YYYY-MM-DD */
        fecha_creado: {
            type: DataTypes.STRING,
            defaultValue: DataTypes.DATEONLY
        },
        /* estado_proyecto: refiere a si aun está activo, en la parte de casos completado
        se mostrarian los proyectos con estado false (es decir, inactivos, porque se completaron) */
        estado_proyecto: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },
        meta_financiamiento: {
            type: DataTypes.DECIMAL,
            allowNull: false
        },
        cantidad_recaudada: {
            type: DataTypes.DECIMAL,
            defaultValue: 0
        },
        /* se crea la instancia con una conexion con otra tabla
        dudo si tendria que presentarse los comentarios aca, la verdad   */
       /*  comentarios: {
            type: DataTypes.TEXT
        }, */
        /* los megusta, son tambien una tabla aparte, que hace conexion con el usuario y proyecto...
        no se si se levantaria de este lado */
        /* me_gusta: {
            type: DataTypes.ARRAY(DataTypes.BOOLEAN)
        }, */
        imagen: {
            type: DataTypes.TEXT
        },
        validado: {
            type: DataTypes.ENUM('aceptado', 'rechazado', 'espera'),
            defaultValue: 'espera'
        }
    }, { timestamps: false })
}