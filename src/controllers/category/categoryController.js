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

    await Promise.all(categories.map(async name => {
        let result = await Category.findAll({
            where: {
                deletedAt: null,
                name
            },
            include: [
                { model: Project, attributes: ['id','title','summary','img','userId'], through: { attributes: [] } },
            ]
        })

        result.map(response => {
            response.dataValues.projects.map(res => {
                console.log("FINAL ==========>",res.dataValues);
                resultProject.push(res.dataValues)
            })
        })

    }))

    console.log(resultProject);

    return resultProject
}


module.exports = {
    getCategories,
    getProjectIncludesCat
}