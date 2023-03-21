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
    
            const userById = await userByID(user.id)

            if(!userById) {
              res.json('error')
            } else {
              req.user = userById

            }
        } catch (error) {
          console.log(error)
        
        }
      }
    
        return next()

    }

module.exports = {
    checkAuth
}
