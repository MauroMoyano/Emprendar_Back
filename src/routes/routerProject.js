const { Router } = require('express')
const { getProjects, postProject, detailProject, updateProjectHl, deleteProjectHl, updateValidateHl } = require('../controllers/project/projectHandler')
const routerProject = Router()

routerProject.get('/', getProjects)
routerProject.get('/:id', detailProject)
routerProject.post('/', postProject)

routerProject.put('/:id', updateProjectHl)
routerProject.delete('/:id', deleteProjectHl)

routerProject.put('/validar/:id',updateValidateHl)

module.exports = routerProject
