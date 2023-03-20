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

sequelize.sync({ force: false, alter:true })
    .then(() => {
        console.log('tablas creadas')
    })
    .then(async () => {
        let arrUser = [
            { user_name: "lechu", name: "lautaro", last_name: "garcia", email: "lechu@lechumail.com", password: "lechu1234", profile_img: "https://bestbuyerpersona.com/wp-content/uploads/2022/02/undraw_profile_pic_ic5t.png", confirmed: true },
            { user_name: "jonny", name: "johnny", last_name: "hernandez", email: "jonny@jonnymail.com", password: "jonny1234", profile_img: "https://bestbuyerpersona.com/wp-content/uploads/2022/02/undraw_profile_pic_ic5t.png", confirmed: true },
            { user_name: "sandy", name: "sandy", last_name: "pestaña", email: "samy@samymail.com", password: "samy1234", profile_img: "https://bestbuyerpersona.com/wp-content/uploads/2022/02/undraw_profile_pic_ic5t.png", confirmed: true },
            { user_name: "nachito", name: "juan", last_name: "arguello", email: "nachito@nachitomail.com", password: "nachito1234", profile_img: "https://bestbuyerpersona.com/wp-content/uploads/2022/02/undraw_profile_pic_ic5t.png", confirmed: true },
        ];
        let arrProject = [
            {
                title: 'herramientas para emprendimiento',
                country: "Chile",
                summary: 'necesito mas herramientas para el emprendimiento',
                description: 'necesito algo de plata para poder adquirir unas herramientas necesarias para poder continuar con mi emprendimiento y seguir adelante',
                goal: 600,
                amount_collected: 560,
                img: 'https://www.tec.ac.cr/hoyeneltec/sites/default/files/styles/colorbox/public/media/img/main/diseno-de-fondo-de-pulgares-arriba_1294-60.jpg',
                userId: '',
                category: ["emprendimiento", "null1", "null2", "null3", "null4"]
            },
            {
                title: 'herramientas de poda',
                country: "México",
                summary: 'necesito herramientas para jardineria',
                description: 'las herramientas que tengo se me fueron rompiendo y no tengo la plata necesaria para poder comprarme unas nuevas en este momento',
                goal: 213,
                amount_collected: 100,
                img: 'https://www.tec.ac.cr/hoyeneltec/sites/default/files/styles/colorbox/public/media/img/main/diseno-de-fondo-de-pulgares-arriba_1294-60.jpg',
                userId: '',
                category: ["emprendimiento", "null1", "null2", "null3", "null4"]
            },
            {
                title: 'proyecto inmobiliario',
                country: "Uruguay",
                summary: 'necesito algunos recursos para poder empezar a arreglar mi local y empezar',
                description: 'tengo el lugar para pdoer empezar pero no las condiciones para trabajar dentro, tengo que darle una mano de pintura y agregar unas cosas mas para que quede presentable para el publico',
                goal: 1200,
                amount_collected: 920,
                img: 'https://www.tec.ac.cr/hoyeneltec/sites/default/files/styles/colorbox/public/media/img/main/diseno-de-fondo-de-pulgares-arriba_1294-60.jpg',
                userId: '',
                category: ["emprendimiento", "social", "null1", "null2", "null3"]
            },
            {
                title: 'colecta para hospital',
                country: "Chile",
                summary: 'recaudacion de fondos',
                description: 'el hospital se esta quedando corto de presupuesto, por lo que estamos juntando dinero para poder comprar elementos necesarios para poder continuar con las labores internas, con los procesimientos como se deben y la compra de instruimental necesarios',
                goal: 22000,
                amount_collected: 1420,
                img: 'https://www.tec.ac.cr/hoyeneltec/sites/default/files/styles/colorbox/public/media/img/main/diseno-de-fondo-de-pulgares-arriba_1294-60.jpg',
                userId: '',
                category: ["medicina", "social", "null1", "null2", "null3"]
            },
            {
                title: 'donaciones a orfanato',
                country: "Argentina",
                summary: 'recaudacion de fondos',
                description: 'los chicos del orfanato estan en condiciones precarias en las cuales no se deberia vivir, estamos recaudando fondos para poder apoyarlos y mejorar las condiciones del lugar.',
                goal: 140000,
                amount_collected: 9300,
                img: 'https://www.tec.ac.cr/hoyeneltec/sites/default/files/styles/colorbox/public/media/img/main/diseno-de-fondo-de-pulgares-arriba_1294-60.jpg',
                userId: '',
                category: ["social", "cultural", "educación", "null1", "null2"]
            },
            {
                title: 'un futuro mejor',
                country: 'Paraguay',
                summary: 'ayuda a escuelas rurales',
                description: 'los chicos de la escuela necesitan un apoyo por parte de gurpos de perosnas que quieran aportar su granito de arena',
                goal: 53000,
                amount_collected: 39000,
                img: 'https://www.tec.ac.cr/hoyeneltec/sites/default/files/styles/colorbox/public/media/img/main/diseno-de-fondo-de-pulgares-arriba_1294-60.jpg',
                userId: '',
                category: ["social", "cultural", "null1", "null2", "null3"]
            },
            {
                title: 'mi primer emprendimiento',
                country: 'Bolivia',
                summary: 'falta de ciertos recursos',
                description: 'estoy por empezar con un emprendimiento con un grupo que he estado organizando, pero nos estaria faltando fondos para poder llevarlo acabo...',
                goal: 162000,
                amount_collected: 25000,
                img: 'https://www.tec.ac.cr/hoyeneltec/sites/default/files/styles/colorbox/public/media/img/main/diseno-de-fondo-de-pulgares-arriba_1294-60.jpg',
                userId: '',
                category: ["emprendimiento", "null1", "null2", "null3", "null4"]
            },
            {
                title: 'idea innovadora',
                country: 'Perú',
                summary: 'recursos para poder implementar pruebas en una nueva tecnologia',
                description: 'somoy parte de un grupo de emprendedores que hemos podido hacer un nuevo artefacto innovador, pero por razones economicas no podemos ponerlo a prueba ni menos patentarlo',
                goal: 453500,
                amount_collected: 142000,
                img: 'https://www.tec.ac.cr/hoyeneltec/sites/default/files/styles/colorbox/public/media/img/main/diseno-de-fondo-de-pulgares-arriba_1294-60.jpg',
                userId: '',
                category: ["emprendimiento", "social", "null1", "null2", "null3"]
            }
        ]

        let arrCategory = ["tecnología", "ambiental", "cultural", "social", "medicina", "educación", "emprendimiento", "null1", "null2", "null3", "null4"]

        let arrComents = [
            "Me encantó esta idea. Es muy útil y de alta calidad.",
            "las intenciones tuyas son muy buenas, tienes todo mi apoyo",
            "muy buena la propuesta, exitos!",
            "la veo dificil pero no hay nada que con el tiempo no se pueda realizar"
        ]

        const arrCountry = ["México", "Colombia", "Argentina", "Brasil", "Chile", "Perú", "Ecuador", "Bolivia", "Uruguay", "Paraguay", "Venezuela", "Costa Rica", "Cuba", "Puerto Rico", "República Dominicana", "Honduras", "Nicaragua", "Panamá", "El Salvador", "Guatemala"];

        arrCountry.forEach(async (country) => {
            Country.create({
                name: country
            })
        })

        arrCategory.forEach(async (cat) => {
            await Category.create({
                name: cat

            })
        })

        arrUser.forEach(async (user) => {

            let newUser = await User.create(user)

            let proj1
            let proj2
            newUser.user_name === "lechu"
                ? (
                    proj1 = await Project.create({ ...arrProject[0], /* user_name: newUser.user_name, */ userId: newUser.id}),
                    arrProject[0].category.map(async (cat) => {

                        let catt = await Category.findOne({ where: { name: cat } })

                        await proj1.addCategory(catt)

                        let count = await Country.findOne({ where: { name: arrProject[0].country } })

                        await proj1.setCountry(count)
                    }),
                    proj2 = await Project.create({ ...arrProject[4], /* user_name: newUser.user_name, */ userId: newUser.id}),
                    arrProject[4].category.map(async (cat) => {

                        let catt = await Category.findOne({ where: { name: cat } })

                        await proj2.addCategory(catt)

                        let count = await Country.findOne({ where: { name: arrProject[4].country } })

                        await proj2.setCountry(count)
                    })
                )
                : newUser.user_name === "sandy"
                    ? (
                        proj1 = await Project.create({ ...arrProject[1], /* user_name: newUser.user_name, */ userId: newUser.id}),
                        arrProject[1].category.map(async (cat) => {

                            let catt = await Category.findOne({ where: { name: cat } })

                            await proj1.addCategory(catt)

                            let count = await Country.findOne({ where: { name: arrProject[1].country } })

                            await proj1.setCountry(count)
                        }),
                        proj2 = await Project.create({ ...arrProject[5], /* user_name: newUser.user_name, */ userId: newUser.id}),
                        arrProject[5].category.map(async (cat) => {

                            let catt = await Category.findOne({ where: { name: cat } })

                            await proj2.addCategory(catt)

                            let count = await Country.findOne({ where: { name: arrProject[5].country } })

                            await proj2.setCountry(count)
                        })
                    )
                    : newUser.user_name === "jonny"
                        ? (
                            proj1 = await Project.create({ ...arrProject[2], /* user_name: newUser.user_name, */ userId: newUser.id}),
                            arrProject[2].category.map(async (cat) => {

                                let catt = await Category.findOne({ where: { name: cat } })

                                await proj1.addCategory(catt)

                                let count = await Country.findOne({ where: { name: arrProject[2].country } })

                                await proj1.setCountry(count)
                            }),
                            proj2 = await Project.create({ ...arrProject[6], /* user_name: newUser.user_name, */ userId: newUser.id}),
                            arrProject[6].category.map(async (cat) => {

                                let catt = await Category.findOne({ where: { name: cat } })

                                await proj2.addCategory(catt)

                                let count = await Country.findOne({ where: { name: arrProject[6].country } })

                                await proj2.setCountry(count)
                            })
                        )
                        : newUser.user_name === "nachito"
                            ? (
                                proj1 = await Project.create({ ...arrProject[3], /* user_name: newUser.user_name, */ userId: newUser.id}),
                                arrProject[3].category.map(async (cat) => {

                                    let catt = await Category.findOne({ where: { name: cat } })

                                    await proj1.addCategory(catt)

                                    let count = await Country.findOne({ where: { name: arrProject[3].country } })

                                    await proj1.setCountry(count)
                                }),
                                proj2 = await Project.create({ ...arrProject[7], /* user_name: newUser.user_name, */ userId: newUser.id}),
                                arrProject[7].category.map(async (cat) => {

                                    let catt = await Category.findOne({ where: { name: cat } })

                                    await proj2.addCategory(catt)

                                    let count = await Country.findOne({ where: { name: arrProject[7].country } })

                                    await proj2.setCountry(count)
                                })
                            )
                            : {}
        });
    })
    .catch((error) => {
        console.log(error)
    });

const { Project, User, Category, Comment, Country } = sequelize.models


/* relacion de uno a muchos entre User(uno) a project */
User.hasMany(Project);
Project.belongsTo(User);

/* relacion de muchos a muchos entre Project y Category */
Project.belongsToMany(Category, { through: 'middle_Project_Category', timestamps: false });
Category.belongsToMany(Project, { through: 'middle_Project_Category', timestamps: false });

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



//exportamos la funcion y la instancia para luego crear los modelos

module.exports = { conectarDB, ...sequelize.models };