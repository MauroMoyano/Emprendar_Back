const { Router } = require('express')
const routerUser = require('./routerUser')
const routerProject = require('./routerProject')
const routerComment = require('./routerComment')
const routerCategory = require('./routerCategory')
const routerCountry = require('./routerCountry')
const routerImage = require('./routerImage')

const mainRouter = Router()



mainRouter.use('/user', routerUser)
mainRouter.use('/project', routerProject)
mainRouter.use('/comment', routerComment)
mainRouter.use('/category', routerCategory)
mainRouter.use('/country', routerCountry)
mainRouter.use('/images', routerImage)


module.exports = mainRouter