const { Router } = require('express')
const { getProyects, postProyect, detailProyect } = require('../controllers/proyect/proyectHandler')
const routerProyect = Router()

routerProyect.get('/', getProyects)
routerProyect.get('/:id', detailProyect)
routerProyect.post('/', postProyect)

module.exports = routerProyect
