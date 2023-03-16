
const { Chat, User} = require("../../db");
const {QueryTypes} = require("sequelize")
const {sequelize} =require("../../db")
//esta funcion crea los mensajes 
const chatCreate = async (data) => {
    const {userReceiver,userSender, message} = data

    const newChat = await Chat.create({ 
        usersender: userSender,
        userreceiver: userReceiver,
        message})

    return newChat;
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
    console.log("ssssssssssss====>", userSender);

    const result = await Chat.findAll({
        where : {
            usersender : userSender,
            userreceiver : userReceiver,
           
        }
        
    })

    const result2 = await Chat.findAll({
        where : {
            usersender : userReceiver,
            userreceiver : userSender   
        }
        
    })

    const resultcorrect = result.concat(result2)

    return resultcorrect.sort((a,b)=> a.id - b.id)

}





const getUsers = async()=>{

    const result= await sequelize.query("SELECT id, user_name, profile_img FROM USERS", { type: QueryTypes.SELECT })
    return result
}



/*const { QueryTypes } = require('sequelize');
const users = await sequelize.query("SELECT * FROM `users`", { type: QueryTypes.SELECT });
// We didn't need to destructure the result here - the results were returned directly */



module.exports= {
    chatCreate,
    getChatsforUsers,
    getOwnChats,
    getUsers
}