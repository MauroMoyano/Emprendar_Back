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
    let arrUser = [
      {
        user_name: "lechu",
        name: "lautaro",
        last_name: "garcia",
        email: "lechu@lechumail.com",
        password: "lechu1234",
        profile_img: "algo",
      },
      {
        user_name: "jonny",
        name: "johnny",
        last_name: "hernandez",
        email: "jonny@jonnymail.com",
        password: "jonny1234",
        profile_img: "algo",
      },
      {
        user_name: "sandy",
        name: "sandy",
        last_name: "pestaña",
        email: "samy@samymail.com",
        password: "samy1234",
        profile_img: "algo",
      },
      {
        user_name: "nachito",
        name: "juan",
        last_name: "arguello",
        email: "nachito@nachitomail.com",
        password: "nachito1234",
        profile_img: "algo",
      },
    ];
    let arrProject = [
      {
        title: "herramientas para emprendimiento",
        country: "Chile",
        summary: "necesito mas herramientas para el emprendimiento",
        description:
          "necesito algo de plata para poder adquirir unas herramientas necesarias para poder continuar con mi emprendimiento y seguir adelante",
        goal: 600,
        amount_collected: 560,
        img: "algo" /* 'https://bynder.sbdinc.com/m/23371ada92b5637e/Drupal_Large-STMT82780_A1.jpg' */,
        userId: "",
        category: ["emprendimiento", "cultural"],
      },
      {
        title: "herramientas de poda",
        country: "Uruguay",
        summary: "necesito herramientas para jardineria",
        description:
          "las herramientas que tengo se me fueron rompiendo y no tengo la plata necesaria para poder comprarme unas nuevas en este momento",
        goal: 213,
        amount_collected: 100,
        img: "algo",
        userId: "",
        category: ["emprendimiento"],
      },
      {
        title: "proyecto inmobiliario",
        country: "Uruguay",
        summary:
          "necesito algunos recursos para poder empezar a arreglar mi local y empezar",
        description:
          "tengo el lugar para pdoer empezar pero no las condiciones para trabajar dentro, tengo que darle una mano de pintura y agregar unas cosas mas para que quede presentable para el publico",
        goal: 1200,
        amount_collected: 920,
        img: "algo",
        userId: "",
        category: ["emprendimiento", "social"],
      },
      {
        title: "colecta para hospital",
        country: "Chile",
        summary: "recaudacion de fondos",
        description:
          "el hospital se esta quedando corto de presupuesto, por lo que estamos juntando dinero para poder comprar elementos necesarios para poder continuar con las labores internas, con los procesimientos como se deben y la compra de instruimental necesarios",
        goal: 22000,
        amount_collected: 1420,
        img: "algo",
        userId: "",
        category: ["medicina", "social"],
      },
    ];

    let arrCategory = [
      "tecnologia",
      "ambiental",
      "cultural",
      "social",
      "medicina",
      "educacion",
      "emprendimiento",
    ];

    arrCategory.forEach(async (cat) => {
      await Category.create({
        name: cat,
      });
    });

    arrUser.forEach(async (user) => {
      let newUser = await User.create(user);

      let proj;
      newUser.user_name === "lechu"
        ? ((proj = await Project.create({
            ...arrProject[0],
            user_name: newUser.user_name,
            userId: newUser.id,
            validated: "aceptado",
          })),
          arrProject[0].category.map(async (cat) => {
            let catt = await Category.findOne({ where: { name: cat } });

            await proj.addCategory(catt);
          }))
        : newUser.user_name === "sandy"
        ? ((proj = await Project.create({
            ...arrProject[1],
            user_name: newUser.user_name,
            userId: newUser.id,
            validated: "aceptado",
          })),
          arrProject[1].category.map(async (cat) => {
            let catt = await Category.findOne({ where: { name: cat } });

            await proj.addCategory(catt);
          }))
        : newUser.user_name === "jonny"
        ? ((proj = await Project.create({
            ...arrProject[2],
            user_name: newUser.user_name,
            userId: newUser.id,
            validated: "aceptado",
          })),
          arrProject[2].category.map(async (cat) => {
            let catt = await Category.findOne({ where: { name: cat } });

            await proj.addCategory(catt);
          }))
        : newUser.user_name === "nachito"
        ? ((proj = await Project.create({
            ...arrProject[3],
            user_name: newUser.user_name,
            userId: newUser.id,
            validated: "aceptado",
          })),
          arrProject[3].category.map(async (cat) => {
            let catt = await Category.findOne({ where: { name: cat } });

            await proj.addCategory(catt);
          }))
        : {};
    });
  })
  .catch((error) => {
    console.log(error);
  });

const { Project, User, Category, Comment } = sequelize.models;

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

/* relacion de muchos a uno entre 3 tablas. Comment, Project, User */
/* en User */
User.hasMany(Comment);
Comment.belongsTo(User);
/* en Project */
Project.hasMany(Comment);
Comment.belongsTo(Project);

//exportaamos la funcion y la instancia para luego crear los modelos

module.exports = { conectarDB, ...sequelize.models };
