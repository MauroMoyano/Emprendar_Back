const { Router } = require("express");
const {CreateChatHanlder,getChatHanlder,getUsersFiltrados} = require("../controllers/chats/chatHandler")
const routerChat = Router();


routerChat.post("/", CreateChatHanlder)
routerChat.get("/",getChatHanlder )
//trae todos los usuarios
routerChat.get("/users",getUsersFiltrados )

module.exports = routerChat