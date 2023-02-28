const { Router } = require('express')
const routerProject = require('./routerProject')
const routerUser = require('./routerUser')
const mainRouter = Router()



mainRouter.use('/user', routerUser)
mainRouter.use('/project', routerProject)

module.exports = mainRouter