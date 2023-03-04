const jwt = require('jsonwebtoken')



const generateJWT = (id,name) => {

        //esta funcion crea un jst, el metodo sing es el que firma el jwt, y el process.env.secret es la palabra que usa
        //para firmar este token, el id es el parametro que vamos a usar para generar el jwt
    return jwt.sign({id,name}, process.env.JWT_SECRET, {
        expiresIn: "30d",
        algorithm: "HS256"
    })
}

module.exports =  {generateJWT}