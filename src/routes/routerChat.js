const { Router } = require("express");
const {CreateChatHanlder,getChatHanlder,getUsersFiltrados, getOwnChatsHandler} = require("../controllers/chats/chatHandler")
const routerChat = Router();


routerChat.post("/", CreateChatHanlder)
routerChat.get("/",getChatHanlder )
//trae todos los usuarios
routerChat.get("/users",getUsersFiltrados )
routerChat.get("/getownchats",getOwnChatsHandler)
module.exports = routerChat