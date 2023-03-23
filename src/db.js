require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
const { PGUSER, PGDATABASE, PGPASSWORD, PGHOST, PGPORT } = process.env;

//creamos la instancia de sequelize
const sequelize = new Sequelize(
  `postgresql://${PGUSER}:${PGPASSWORD}@${PGHOST}:${PGPORT}/${PGDATABASE}`,
  {
    dialect: "postgres",
    logging: false,
    native: false,
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
fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });
/* le pasamos por params a cada uno de los modelos definidos en la carpeta models "sequelize" */

modelDefiners.forEach((model) => model(sequelize));

let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

sequelize
  .sync({ force: true })
  .then(() => {
    console.log("tablas creadas");
  })
  .then(async () => {
    let arrCategory = [
      "tecnología",
      "ambiental",
      "cultural",
      "social",
      "medicina",
      "educación",
      "emprendimiento",
      "null1",
      "null2",
      "null3",
      "null4",
    ];

    const arrCountry = [
      "México",
      "Colombia",
      "Argentina",
      "Brasil",
      "Chile",
      "Perú",
      "Ecuador",
      "Bolivia",
      "Uruguay",
      "Paraguay",
      "Venezuela",
      "Costa Rica",
      "Cuba",
      "Puerto Rico",
      "República Dominicana",
      "Honduras",
      "Nicaragua",
      "Panamá",
      "El Salvador",
      "Guatemala",
    ];

    arrCountry.forEach(async (country) => {
      Country.create({
        name: country,
      });
    });

    arrCategory.forEach(async (cat) => {
      await Category.create({
        name: cat,
      });
    });
  })
  .catch((error) => {
    console.log(error);
  });

const { Project, User, Category, Comment, Country, Reputation } =
  sequelize.models;

/* relacion de uno a muchos entre User(uno) a project */
User.hasMany(Project);
Project.belongsTo(User);

/* relacion de muchos a muchos entre Project y Category */
Project.belongsToMany(Category, {
  through: "middle_Project_Category",
  timestamps: false,
});
Category.belongsToMany(Project, {
  through: "middle_Project_Category",
  timestamps: false,
});

/* relacion de uno a muchos entre Country y Project */
Country.hasMany(Project);
Project.belongsTo(Country);

/* relacion de muchos a uno entre 3 tablas. Comment, Project, User */
/* en User */
User.hasMany(Comment);
Comment.belongsTo(User);
/* en Project */
Project.hasMany(Comment);
Comment.belongsTo(Project);

/* relacion de muchos a muchos  */

//exportamos la funcion y la instancia para luego crear los modelos

module.exports = { conectarDB, ...sequelize.models, sequelize };
