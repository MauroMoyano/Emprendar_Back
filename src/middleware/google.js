const passport = require("passport");
var GoogleStrategy = require('passport-google-oauth20').Strategy;
const {User} = require('../db')
const {userByID} = require('../controllers/user/userController')
const { generateJWT } = require("../..//utils/generateJWT");

require('dotenv').config()



passport.use("google", new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL : `${process.env.BACKEND_URL}/user/auth/google/callback`,
    scope: ["profile", "email"],
    authorizationURL: 'https://accounts.google.com/o/oauth2/auth',
    tokenURL: 'https://accounts.google.com/o/oauth2/token',
    passReqToCallback: true
} , async function(req,accesToken, refreshToken, profile, done) {
   

      

       const newUser = await User.findOne({
        where: {
            email : profile._json.email,

        },
           paranoid: false
       })
        // console.log("arreglando con colsole log ", newUser)


    if(newUser?.dataValues?.deletedAt) {
        done("Esta cuenta esta baneada")
        return
    }

    if(newUser) {
            const user = await userByID(newUser.id)
            user.token =  generateJWT(user.id, user.user_name)
            done(null,user)
       } else {

        const userByGoogle = await User.create({

            name : profile.name.givenName,
            last_name: profile.name.familyName,
            user_name: profile.name.familyName.substring(0,3) + profile.name.givenName.substring(0,3) + Math.floor(Math.random() * 1000),
            email : profile._json.email,
            profile_img: profile._json.picture,
            confirmed:true,
            password: ''
       }) 
       userByGoogle.token = generateJWT(userByGoogle.id, userByGoogle.user_name)
       done(null, userByGoogle)

       }

} ))



module.exports = {passport}
