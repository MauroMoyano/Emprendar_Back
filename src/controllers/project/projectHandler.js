const { proyectCreateEmail } = require('../../../utils/emails')
const { searchProject, getAllProjects } = require('./projectController')
/* este handler trae como bien dice todos los proyectos */
const getProjects = async (req, res) => {

    let { page, country, orden, category, search } = req.query
    try {
        let data = { page, country, orden, category, search }
        let result = await getAllProjects(data)
        res.status(201).json(result)

    } catch (error) {
        res.status(406).json({ error: error.message })
    }
}

/*  */
/* const { getAllProjects2 } = require('./projectController')
const getProjectsToCopy = async (req, res) => {
    console.log('llego hasta aca');
    try {
        let result = await getAllProjects2()
        res.status(201).json(result)
    } catch (error) {
        res.status(406).json({ error: error.message })
    }

} */
/*  */

const { getFilteredProjects } = require('./projectController')
/* handler de los proyectos filtrados por varias condicionales mixtas */
const getAllFilteredProjects = async (req, res) => {
    console.log(req.query);
    try {
        await getFilteredProjects(req.query)
            .then(result => res.status(201).json(result))
    } catch (error) {
        res.status(406).json({ error: error.message })
    }
}


const { addProject } = require('./projectController')
/* posteo de un proyecto de un usuario particular.
TODO: agregarle los parentsData (o prototipos) de los datos que puede subir (o como les digan a eso) */
const postProject = async (req, res) => {
    const {name, email} = req.user
    const {title} = req.body
    try {
        let result = await addProject(req.body)
    proyectCreateEmail({name,email, title})

        res.status(201).json(result)
    } catch (error) {
        res.status(406).json({ error: error.message })
    }


}

const { getProjectById } = require('./projectController')
/* ver el detalle de un proyecto particular (datos adicionales) */
const detailProject = async (req, res) => {
    let { id } = req.params

    try {
        let result = await getProjectById(id)
        res.status(201).json(result)
    } catch (error) {
        res.status(406).json({ error: error.message })
    }

}
const { deleteProject } = require('./projectController')
/* el borrado lógico del proyecto pasado por params.
TODO: falta autenticar que el usuario que tienen en el estado de redux sea el mismo usuario que
quiere dar de baja su proyecto */
const deleteProjectHl = async (req, res) => {
    let { id } = req.params

    try {
        let result = await deleteProject(id)
        res.status(201).json(result)
    } catch (error) {
        res.status(406).json({ error: error.message })
    }

}

const { updateProject } = require('./projectController')
/* update de datos del proyecto. recibe el id por params y los datos a cambiar por body */
const updateProjectHl = async (req, res) => {

    const { id } = req.params

    try {
        let result = await updateProject(id, req.body)
        res.status(201).json(result)
    } catch (error) {
        res.status(406).json({ error: error.message })
    }

}

const { updateValidate } = require('./projectController')
/* update de un valor del proyecto para ver si se mostrará o no */
const updateValidateHl = async (req, res) => {
    let { id } = req.params
    let { validate } = req.body
    try {
        let result = await updateValidate(id, validate)
        res.status(201).json(result)
    } catch (error) {
        res.status(406).json({ error: error.message })
    }

}


const { getAllProjectsAdmin } = require('./projectController')

const getAllProjectsAdminHl = async (req, res) => {
    const { filter } = req.query
    try {
        let result = await getAllProjectsAdmin(filter)
        res.status(201).json(result)
    } catch (error) {
        res.status(406).json({ error: error.message })
    }

}


module.exports = {
    getProjects,
    postProject,
    detailProject,
    updateProjectHl,
    /* getProjectsToCopy, */
    /* filtro de proyectos */
    getAllFilteredProjects,
    /* de Usuario y ADMIN */
    deleteProjectHl,
    /* de solo ADMIN */
    updateValidateHl,

    getAllProjectsAdminHl
}