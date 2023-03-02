const { Category } = require('../../db')

/* trate las categorias para cargarlas en el redux del front */
const getCategories = async () => {
    let categories = await Category.findAll()

    return categories.map(cat => {
        return {
            id: cat.dataValues.id,
            name: cat.dataValues.name
        }
    });
}


module.exports = getCategories