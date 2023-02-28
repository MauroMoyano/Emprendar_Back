const { Router } = require('express')
const routerProyect = require('./routerProyect')
const routerUser = require('./routerUser')
const mainRouter = Router()



mainRouter.use('/user', routerUser)
mainRouter.use('/proyect', routerProyect)

module.exports = mainRouter