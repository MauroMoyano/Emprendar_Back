const passport = require("passport");
var GoogleStrategy = require('passport-google-oauth20').Strategy;
const {User} = require('../db')
const {userByID} = require('../controllers/user/userController')
require('dotenv').config()



passport.use("google", new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL : "http://localhost:3001/user/auth/google/callback",
    scope: ["profile", "email"],
    authorizationURL: 'https://accounts.google.com/o/oauth2/auth',
    tokenURL: 'https://accounts.google.com/o/oauth2/token',
    passReqToCallback: true
} , async function(req,accesToken, refreshToken, profile, done) {
   


       const newUser = await User.findOne({
        where: {
            email : profile._json.email
        }
       })

       if(newUser) {
            const user = await userByID(newUser.id)

            done(null,user)
       }

        const userByGoogle = await User.create({

            name : profile.name.givenName,
            last_name: profile.name.familyName,
            user_name: profile.displayName,
            email : profile._json.email,
            profile_img: profile._json.picture,
            confirmed:true,
            password: ''
       }) 

         done(null, userByGoogle)
} ))



module.exports = {passport}
