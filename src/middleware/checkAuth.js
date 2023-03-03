const jwt = require("jsonwebtoken");

const checkAuth = (req, res, next) => {
   
        const autHeader = req.get("Authorization");
        console.log(req)
      if (autHeader) {
        //obtener el token
        const token = autHeader.split(" ")[1];
        
       
        // comprobar el JWT
    
        try {
          const user = jwt.verify(token, process.env.JWT_SECRET);
    
   
          req.user = user
       
        } catch (error) {
         res.json('error')
        }
      }
    
        return next()

    }

module.exports = {
    checkAuth
}
