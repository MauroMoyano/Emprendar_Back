/* ruta '/' */
const { searchProject, getAllProjects } = require('./projectController')
const getProjects = async (req, res) => {
    /* traerá todos los proyectos de no presentar query */
    let { name } = req.query
    try {
        if (name) {
            let result = await searchProject(name)
            res.status(201).json(result)
        } else {
            let result = await getAllProjects()
            res.status(201).json(result)
        }
    } catch (error) {
        res.status(406).json({ error: error.message })
    }
}

/* ruta '/search' */
const { addProject } = require('./projectController')
const postProject = async (req, res) => {
    /* definira un proyecto nuevo */
    try {
        let result = await addProject(req.body)
        res.status(201).json(result)
    } catch (error) {
        res.status(406).json({ error: error.message })
    }


}

const { getProjectById } = require('./projectController')
const detailProject = async (req, res) => {
    let { id } = req.params

    try {
        let result = await getProjectById(id)
        res.status(201).json(result)
    } catch (error) {
        res.status(406).json({ error: error.message })
    }

}


module.exports = {
    /* ruta '/' */
    getProjects,
    postProject,
    /* ruta '/search' */
    detailProject,
}