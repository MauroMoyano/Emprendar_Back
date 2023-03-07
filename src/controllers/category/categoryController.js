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

    console.log(categories);

    const resultProject = []

    categories.forEach(async name => {
        let result = await Category.findAll({
            where: {
                deletedAt: null,
                name
            },
            include: [
                { model: Project, attributes: ['title'], through: { attributes: [] } },
            ]
        })

        /* console.log(result[0].dataValues.projects[0].dataValues); */

        result.map(response => {
            response.dataValues.projects.map(res => {
                console.log("FINAL ==========>",res.dataValues);
                resultProject.push(res.dataValues)
            })
        })

    });

    console.log(resultProject);

    return resultProject
}


module.exports = {
    getCategories,
    getProjectIncludesCat
}