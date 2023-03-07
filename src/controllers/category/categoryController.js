const { Category, Project } = require('../../db')

/* trate las categorias para cargarlas en el redux del front */
const getCategories = async () => {
    let categories = await Category.findAll()

    return categories.map(cat => {
        return cat.dataValues.name
    });
}

const getProjectIncludesCat = async (data) => {
    let resultProject = []
    data.forEach(async category => {
        resultProject.push(await Category.findAll({
            where: {
                name: category
            }, includes: [
                { module: Project, attributes: ['id', 'title', 'summary'] }
            ]
        }))
    });
    return new Set(resultProject)
}


module.exports = { getCategories, getProjectIncludesCat }