const { Router } = require('express')
<<<<<<< HEAD
const { getProjects, postProject, amountCollected, detailProject, updateProjectHl, deleteProjectHl, updateValidateHl, getAllFilteredProjects, getAllProjectsAdminHl } = require('../controllers/project/projectHandler')
=======

const { getProjects, postProject, detailProject, updateProjectHl, deleteProjectHl, updateValidateHl, getAllFilteredProjects, getAllProjectsAdminHl, getProjectsToCopy } = require('../controllers/project/projectHandler')

>>>>>>> 3052e1ec3036011fca3e7ddce40ae24f0e850a5d
const routerProject = Router()

/* rutas de Usuarios */
/* ruta para traer todos los poryectos */
routerProject.get('/', getProjects)
/* ruta para filtro de proyectos */
routerProject.get('/filter', getAllFilteredProjects)
/* ruta para el detalle del proyecto pasado por params */
routerProject.get('/:id', detailProject)
/* ruta para postear un nuevo prouecto */
routerProject.post('/', postProject)
/* ruta para cambios/actualiazcion de valores del proyecto */
routerProject.put('/:id', updateProjectHl)

/* de Usuarios, y ADMINS */
/* ruta de borrado lógico */
routerProject.delete('/:id', deleteProjectHl)

/* rutas ADMIN */
/* ruta de validacion de la peticion de mostrado de proyecto */
routerProject.put('/validar/:id', updateValidateHl)

routerProject.get('/get/all', getAllProjectsAdminHl)

/*  */
/* routerProject.get('/home', getProjectsToCopy) */
/*  */
module.exports = routerProject
