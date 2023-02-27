const { Router } = require('express')
const { getProjects, postProyect } = require('../controllers/proyect/proyectHandler')
const routerProyect = Router()

routerProyect.get('/', getProjects)
routerProyect.post('/', postProyect)

module.exports = routerProyect
