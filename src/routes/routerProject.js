const { Router } = require('express')
const { getProjects, postProject, detailProject } = require('../controllers/project/projectHandler')
const routerProject = Router()

routerProject.get('/', getProjects)
routerProject.get('/:id', detailProject)
routerProject.post('/', postProject)

module.exports = routerProject
