const getCategories = require("./categoryController")


/* handler para hacer una peticion de todas las categorias */
const getAllCategories = async function (req, res) {

    try {
        let result = await getCategories()
        res.status(201).json(result)
    } catch (error) {
        res.status(406).json({ error: error.message })
    }
}


module.exports = getAllCategories