
const {chatCreate,  getChatsforUsers, getOwnChats, getUsers} = require("./chatController")


//traigo mis chats
const getOwnChatsHandler = async function(req, res){
 
  try {
    const response = await getOwnChats(req.query.user);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}


const CreateChatHanlder = async function (req, res) {
    try {
      const response = await chatCreate(req.body);
      res.status(200).json(response);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
};



const getChatHanlder = async function (req, res) {
    // userSender,  userReceiver)

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


const getUsersFiltrados = async function (req, res) {

  try {
    const response = await getUsers()
    res.status(200).json(response);
      
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


module.exports = {CreateChatHanlder, getChatHanlder,getUsersFiltrados, getOwnChatsHandler}