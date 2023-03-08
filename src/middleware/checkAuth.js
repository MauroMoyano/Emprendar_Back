const jwt = require("jsonwebtoken");
const { userByID } = require("../controllers/user/userController");

const checkAuth = async (req, res, next) => {
   
        const autHeader = req.get("Authorization");
   
      if (autHeader) {
        //obtener el token
        const token = autHeader.split(" ")[1];
        
       
        // comprobar el JWT
        
        try {
          const user = jwt.verify(token, process.env.JWT_SECRET);
    
          
          req.user = await userByID(user.id)
        } catch (error) {
          console.log(error)
         res.json('error')
        }
      }
    
        return next()

    }

module.exports = {
    checkAuth
}
