const { Router } = require('express')
const { getProyects, postProyect } = require('../controllers/proyect/proyectHandler')
const routerProyect = Router()

routerProyect.get('/', getProyects)
routerProyect.post('/', postProyect)

module.exports = routerProyect
