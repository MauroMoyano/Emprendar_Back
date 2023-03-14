
const { Chat} = require("../../db");

//esta funcion crea los mensajes 
const chatCreate = async (data) => {
    const {userReceiver,userSender, message} = data

    const newChat = await Chat.create({ 
        userSender,
        userReceiver,
        message})
    return newChat
};
//esta funcion trae todos los mensajes que envio un usuario especifico
const getOwnChats = async(userSender) =>{
    
    const allchat = Chat.findAll(
        {where: {
            userSender    
        }})
    return allchat

}



//esta funcion trae todas las conversaciones entre dos usuarios
const getChatsforUsers = async(userSender,  userReceiver) =>{
    
    const allchat = Chat.findAll(
        {where: {
            userSender,
            userReceiver
        }})
    return allchat

}



module.exports= {
    chatCreate,
    getChatsforUsers,
    getOwnChats
}