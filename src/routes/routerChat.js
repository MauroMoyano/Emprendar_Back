const { Router } = require("express");
const {CreateChatHanlder,getChatHanlder} = require("../controllers/chats/chatHandler")
const routerChat = Router();


routerChat.post("/", CreateChatHanlder)
routerChat.get("/",getChatHanlder )

module.exports = routerChat