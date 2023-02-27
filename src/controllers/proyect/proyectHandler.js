/* ruta '/' */
const { searchProyect, getAllProyects } = require('./proyectController')
const getProyects = async (req, res) => {
    /* traerá todos los proyectos de no presentar query */
    let { name } = req.query
    try {
        if (name) {
            let result = await searchProyect(name)
            res.status(201).json(result)
        } else {
            let result = await getAllProyects()
            res.status(201).json(result)
        }
    } catch (error) {
        res.status(406).json({ error: error.message })
    }
}

/* ruta '/search' */
const { addProyect } = require('./proyectController')
const postProyect = async (req, res) => {
    /* definira un proyecto nuevo */
    try {
        let result = await addProyect(req.body)
        res.status(201).json(result)
    } catch (error) {
        res.status(406).json({ error: error.message })
    }


}

const { getProyectById } = require('./proyectController')
const detailProyect = async (req, res) => {
    let { id } = req.params

    try {
        let result = await getProyectById(id)
        res.status(201).json(result)
    } catch (error) {
        res.status(406).json({ error: error.message })
    }

}


module.exports = {
    /* ruta '/' */
    getProyects,
    postProyect,
    /* ruta '/search' */
    detailProyect,
}