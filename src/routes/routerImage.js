const { Router } = require("express");
const routeImage = Router()
const {uploadImageHl} = require('../controllers/images/imagesHandler')



routeImage.post('/upload', uploadImageHl)


module.exports = routeImage