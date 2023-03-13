const { Router } = require('express')
const { getProjects, postProject, detailProject, updateProjectHl, deleteProjectHl, updateValidateHl, getAllFilteredProjects, getProjectsToCopy } = require('../controllers/project/projectHandler')
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


/*  */
/* routerProject.get('/home', getProjectsToCopy) */
/*  */
module.exports = routerProject
