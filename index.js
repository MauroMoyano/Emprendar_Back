
const passport = require("passport");
const bodyParser = require('body-parser');
const express = require("express");
const cors = require("cors");
const { conectarDB } = require("./src/db");
require('dotenv').config()

//creamos el servidor

const app = express();

app.use(passport.initialize())

// conectamos a la base de datos

conectarDB();

//habilitaamos cors
const opcionesCors = {
    origin: process.env.FRONTEND_URL,
};

app.use(cors(opcionesCors));

//habilitamos leer los valores del body

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
// dejamos definido el puerto para railway, si no existe usamos 3001

const port = process.env.PORT || 3001;

//definimos las rutas

app.use('/', require('./src/routes/index'))

//arrancar la app

// "0.0.0.0"  el servidor estará disponible para conexiones entrantes desde cualquier dirección IP.
app.listen(port, "0.0.0.0", () => {
    console.log("el servidor esta corriendo en el puerto" + port);
    /* prueba creado de usuarios y pryectos */
    
});