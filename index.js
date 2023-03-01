const express = require("express");
const cors = require("cors");
const { conectarDB } = require("./src/db");
require('dotenv').config()

//creamos el servidor

const app = express();

// conectamos a la base de datos

conectarDB();

//habilitaamos cors


app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000/'); // update to match the domain you will make the request from
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
  });

//habilitamos leer los valores del body

app.use(express.json());

// dejamos definido el puerto para railway, si no existe usamos 3001

const port = process.env.PORT || 3001;

//definimos las rutas

app.use('/', require('./src/routes/index'))

//arrancar la app

// "0.0.0.0"  el servidor estará disponible para conexiones entrantes desde cualquier dirección IP.
app.listen(port, "0.0.0.0", () => {
    console.log("el servidor esta corriendo en el puerto http://localhost:" + port);
    /* prueba creado de usuarios y pryectos */
    
});