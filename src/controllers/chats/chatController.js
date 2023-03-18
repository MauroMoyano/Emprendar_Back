
const { Chat, User} = require("../../db");
const {QueryTypes, where} = require("sequelize")
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

//recibo el nombre del usuario logeadi
const getOwnChats = async(user) =>{
    

    //array de los nombres de usuarios con los que hable 
    let array = [];
    //chats que yo incie 
    const first_chats = await Chat.findAll({
        where: {
            usersender: user    
        }}
    )


    //chats en las que yo recibi el preimer mensaj
    const second_chats = await Chat.findAll({
        where :{
            userreceiver: user
        }}
    )
   
    //aca debo comparar el dato que se encuentra en userreceiver
    first_chats.forEach(chat => {
        let {userreceiver} = chat;
        if (array.indexOf(userreceiver) === -1) {
            array.push(userreceiver)
        }            
    });

    second_chats.forEach(chat => {
        let {usersender} = chat;
        if (array.indexOf(usersender) === -1) {
            array.push(usersender)
        }            
    });

    let users_conversations = [];

    for (let x = 0; x < array.length; x++) {
        const element = array[x];
        let result = await User.findAll({
                where : {
                    user_name: element
                } 
            }) 
        users_conversations.push(result[0])
    }
    return users_conversations

}




//esta funcion trae todas las conversaciones entre dos usuarios
const getChatsforUsers = async(userSender,  userReceiver) =>{

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