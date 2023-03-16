
const passport = require("passport");
const bodyParser = require('body-parser');
const express = require("express");
const cors = require("cors");
const { conectarDB } = require("./src/db");
require('dotenv').config()
const {Server}  = require("socket.io")
const http = require("http")
const morgan = require("morgan");
const { Socket } = require("dgram");
const {chatCreate} =require("./src/controllers/chats/chatController")


//creamos el servidor
const app = express();

const server = http.createServer(app)


const io = new Server (server,{
    cors: {
        origin : "http://localhost:3000"
    }
})



io.on("connection", (socket) => {
    console.log("a user connected")

    socket.on("abrir_chat",(chatId)=>{
        socket.join(chatId)
    } )

    socket.on("message",(data)=>{
        chatCreate(data)
        console.log(data);

        socket.to(123).emit("send_message",data )
    })



})





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
app.use(morgan("dev"))
app.use(bodyParser.urlencoded({ extended: false }));
// dejamos definido el puerto para railway, si no existe usamos 3001

const port = process.env.PORT || 3001;

//definimos las rutas

app.use('/', require('./src/routes/index'))

//arrancar la app

// "0.0.0.0"  el servidor estará disponible para conexiones entrantes desde cualquier dirección IP.
server.listen(port, "0.0.0.0", () => {
    console.log("el servidor esta corriendo en el puerto" + port);
    /* prueba creado de usuarios y pryectos */
    
});


module.exports = {io}
//socket

