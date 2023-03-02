const { Router } = require('express')
const getAllCategories = require('../controllers/category/categoryHandler')
const routerCategory = Router()

/* ruta para poder cargar con las categorias el estado global */
routerCategory.get('/', getAllCategories)

module.exports = routerCategory