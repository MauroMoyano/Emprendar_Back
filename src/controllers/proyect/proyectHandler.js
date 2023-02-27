/* ruta '/' */
const { getProyectById, getAllProyects } = require('./proyectController')
const getProyects = async (req, res) => {
    /* traerá todos los proyectos de no presentar query */
    let { id } = req.params
    try {
        if (id) {
            let result = await getProyectById(id)
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

const { searchProyect } = require('./proyectController')
const searchProyects = async (req, res) => {

    try {
        let result = await searchProyect(req.body)
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
    searchProyects,
}