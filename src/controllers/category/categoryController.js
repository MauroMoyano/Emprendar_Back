const { Promise } = require('bluebird');
const { Category, Project } = require('../../db')

/* trate las categorias para cargarlas en el redux del front */
const getCategories = async () => {
    let categories = await Category.findAll()

    return categories.map(cat => {
        return cat.dataValues.name
    });
}

const getProjectIncludesCat = async (data) => {

    const { categories } = data

    let resultDB
    
    typeof categories !== 'string'
        ? resultDB = await categories.map(async name => {
            return await Category.findAll({
                where: {
                    deletedAt: null,
                    name
                },
                include: [
                    { model: Project, attributes: ['id', 'title', 'summary', 'img', 'userId'], through: { attributes: [] } },
                ]
            })
        })
        : resultDB = await Category.findAll({
            where: {
                deletedAt: null,
                name: categories
            },
            include: [
                { model: Project, attributes: ['id', 'title', 'summary', 'img', 'userId'], through: { attributes: [] } },
            ]
        })

    return await Promise.all(resultDB)
        .then(res => res.flat())
        .then(res => res.flatMap(data => data.projects))
}

module.exports = {
    getCategories,
    getProjectIncludesCat
}