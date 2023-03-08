const { Router } = require('express')
const { getAllCategories, getProjectsByCategiries } = require('../controllers/category/categoryHandler')
const routerCategory = Router()

/* ruta para poder cargar con las categorias el estado global */
routerCategory.get('/', getAllCategories)

routerCategory.get('/similares', getProjectsByCategiries)

module.exports = routerCategory