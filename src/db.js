require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require('fs');
const path = require("path");
const { PGUSER, PGDATABASE, PGPASSWORD, PGHOST, PGPORT } = process.env;


//creamos la instancia de sequelize
const sequelize = new Sequelize(
    `postgresql://${PGUSER}:${PGPASSWORD}@${PGHOST}:${PGPORT}/${PGDATABASE}`,
    {
        dialect: "postgres",
        logging: false,
        native: false
    }
);

//creamos una funcion para conectarnos a la bd
const conectarDB = async () => {
    try {
        await sequelize.authenticate();
    } catch (error) {
        //si hay un error consologear y salir de la conexion
        console.log(error);
        process.exit(1);
    }
};
/* contenedor de los archivos contenidos en la carpeta models */
const modelDefiners = [];
/* hace una diferencia de index.js (no seria necesaria en nuestro caso, pero no esta mal ponerlo) */
const basename = path.basename(__filename);

/* agregamos cada uno de los archivos a un array "modelDefiners" */
fs.readdirSync(path.join(__dirname, '/models'))
    .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
    .forEach((file) => {
        modelDefiners.push(require(path.join(__dirname, '/models', file)));
    });
/* le pasamos por params a cada uno de los modelos definidos en la carpeta models "sequelize" */

modelDefiners.forEach(model => model(sequelize));

let entries = Object.entries(sequelize.models);
let capsEntries = entries.map(entry => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries)


sequelize.sync({ force: false })
    .then(() => {
        console.log('tablas creadas')
    }).catch((error) => {
        console.log(error)
    });

const { Proyect, User } = sequelize.models


/* relacion de uno a muchos entre User(uno) a proyect */
User.hasMany(Proyect);
Proyect.belongsTo(User);

//exportaamos la funcion y la instancia para luego crear los modelos

module.exports = { conectarDB, ...sequelize.models, Proyect, User };