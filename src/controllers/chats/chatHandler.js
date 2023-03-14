
const {chatCreate,  getChatsforUsers, getOwnChats} = require("./chatController")



const CreateChatHanlder = async function (req, res) {
    console.log("estos son los datos del body",req.body);

    try {
      const response = await chatCreate(req.body);
      res.status(200).json(response);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
};



const getChatHanlder = async function (req, res) {
    // userSender,  userReceiver)
    console.log("querys ", req.query );

    //hacer un condicional si solo tengo el userSender, mostrar todos sus chats,cuando tenga el userReceiver mostrar los chats especificos
    const {userSender, userReceiver} = req.query
    try {

        if(userSender && userReceiver){
            //chats especificos con un usuario
            const response =  await getChatsforUsers(userSender, userReceiver);
            res.status(200).json(response);
        } else if(userSender){
            //todos sus chats
            const response = await getOwnChats(userSender)
            res.status(200).json(response);

        }
        
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
};





module.exports = {CreateChatHanlder, getChatHanlder}