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


sequelize.sync({ force: true })
    .then(() => {
        console.log('tablas creadas')
    })
     .then(async () => {
         let arrUser = [
             { user_name: "lechu", name: "lautaro", last_name: "garcia", email: "lechu@lechumail.com", password: "lechu1234", profile_img: "algo" },
             { user_name: "samm", name: "samy", last_name: "samy", email: "samy@samymail.com", password: "samy1234", profile_img: "algo" },
             { user_name: "jonny", name: "johnny", last_name: "test", email: "jonny@jonnymail.com", password: "jonny1234", profile_img: "algo" },
             { user_name: "nachito", name: "juan", last_name: "arguello", email: "nachito@nachitomail.com", password: "nachito1234", profile_img: "algo" },
         ];
         let arrProject = [
             { title: 'pala', summary: 'necesito pala', description: 'mi descripcion del proyecto', goal: 600, img: 'algo', userId: '', category: ["emprendimiento", "educacion"] },
             { title: 'palita', summary: 'necesito palita', description: 'mi descripcion del proyecto', goal: 213, img: 'algo', userId: '', category: ["emprendimiento", "medicina"] },
             { title: 'pico', summary: 'necesito un pico', description: 'mi descripcion del proyecto', goal: 1200, img: 'algo', userId: '', category: ["emprendimiento", "ambiental"] }
         ]
         let arrCategory = ["tecnologia", "ambiental", "cultural", "social", "medicina", "educacion", "emprendimiento"]

         arrCategory.forEach(async (cat) => {
            await Category.create({
                name: cat

           })
    })

    arrUser.forEach(async (user) => {
         let newUser = await User.create(user)
         arrProject.forEach(async (project) => {
             let proj = await Project.create({ title: project.title, summary: project.summary, description: project.description, goal: project.goal, img: project.img, userId: newUser.id })
             project.category.forEach(async (cat) => {
                 let catt = await Category.findOne({ where: { name: cat } })
                 await proj.addCategory(catt)
             })
         })
     });

    })
     .catch((error) => {
         console.log(error)
    });

const { Project, User, Category, Comment } = sequelize.models


/* relacion de uno a muchos entre User(uno) a project */
User.hasMany(Project);
Project.belongsTo(User);

/* relacion de muchos a muchos entre Project y Category */
Project.belongsToMany(Category, { through: 'middle_Project_Category', timestamps: false });
Category.belongsToMany(Project, { through: 'middle_Project_Category', timestamps: false });


//exportaamos la funcion y la instancia para luego crear los modelos

module.exports = { conectarDB, ...sequelize.models, Project, User };