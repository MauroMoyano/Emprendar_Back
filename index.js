const passport = require("passport");
const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors");
const { conectarDB } = require("./src/db");
const socket = require("socket.io");
require("dotenv").config();
const morgan = require("morgan");
//creamos el servidor
const app = express();

app.use(passport.initialize());

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

app.use("/", require("./src/routes/index"));

//arrancar la app

// "0.0.0.0"  el servidor estará disponible para conexiones entrantes desde cualquier dirección IP.
const server = app.listen(port, "0.0.0.0", () => {
  console.log("el servidor esta corriendo en el puerto" + port);
  /* prueba creado de usuarios y pryectos */
});

const io = new socket.Server(server, {
  pingTimeout: 6000,
  cors: {
    origin: process.env.FRONTEND_URL,
  },
});

io.on("connection", (socket) => {
  console.log("conectado a socket.io");

  //definir los eventos
  

  // (/chats)
  socket.on("messages",(data)=>{
    //data contien los datos del user que envia y el que recibe la info para saber que usuarios deberiar renderizar sus chats

    socket.broadcast.emit("messages", data)
  })




  // (/comments)
  socket.on("abrir proyecto", (project) => {
    socket.join(project);
  });

  socket.on("nuevo comentario", (data) => {
    socket.to(data.projectId).emit("comentario agregado", data);
  });

  socket.on("eliminar comentario", (data) => {
    socket.to(data).emit("comentario eliminado", data);
  });
});
