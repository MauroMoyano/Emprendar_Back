const { Project, User, Country, Category } = require('../../db')

const addProject = async (data) => {

    //TODO crear validaciones

    const { title, summary, description, goal, img, userId, country, user_name, category } = data

    //validacion precaria xd
    if (title === '' || summary === '' || description === '' || img === '' || userId === '') {
        return {
            msg: 'Todos los campos son obligatorios'
        }
    }
    let user = await User.findByPk(userId)

    let countries = await Country.findOne({ where: { name: country } })

    //crear el projecto
    const projecto = await Project.create({
        title,
        summary,
        description,
        goal,
        img,
        country,
        user_name,
        category,
        userId: userId  //esto viene del user autenticado
    })

    await category.map(async (name) => {
        let cat = await Category.findOne({ where: { name } })
        await projecto.addCategory(cat)
    })

    await projecto.setUser(user)
    await projecto.setCountry(countries)

    return {
        msg: 'Projecto Creado correctamente'
    }
}


const getProjectById = async (id) => {
    //buscamos por el id
    const project = await Project.findByPk(
        id,
        {
            include: [
                { model: Country, attributes: ['name'] },
                { model: Category, attributes: ['name'], through: { attributes: [] } },
            ]
        })
    return project

}

/* a incluir filtros tambien. */

const getAllProjects = async (page, pageNum = 4) => {
    //buscamos todos los projectos

    let offset = (page - 1) * pageNum;
    let limit = pageNum;

    const { count, rows } = await Project.findAndCountAll({
        offset,
        limit,
        /* order: [['title', 'ASC']], */
        where: {
            validated: 'aceptado',
            deletedAt: null
        },
        include: [
            { model: Country, attributes: ['name'] },
            { model: User, attributes: ['id', 'user_name', 'profile_img'] },
            { model: Category, attributes: ['name'], through: { attributes: [] } },
        ]
    });

    return rows

}





/* fin de filtros. */

const searchProject = async (projectTitle) => {
    //buscamos el projecto por el nombre
    let project = await Project.findAll({
        where: {
            validated: 'aceptado',
            deletedAt: null
        },
        include: [
            { model: Country, attributes: ['name'] },
            { model: User, attributes: ['id', 'user_name', 'profile_img'] },
            { model: Category, attributes: ['name'], through: { attributes: [] } },
        ]
    })

    project = project.filter(pj => pj.dataValues.title.includes(projectTitle))

    if (!project) throw new Error('No existe ningun projecto con este nombre')

    return project
}


//funcion borrar project
const deleteProject = async (id) => {

    const projectDelete = await Project.findOne({
        where: {
            id: id
        }
    })

    if (projectDelete) {
        await Project.destroy({
            where: {
                id: id
            }
        })

        return {
            msg: 'Proyecto Eliminado Correctamente'
        }
    } else {
        throw new Error('No existe el projecto a eliminar')
    }

}


const updateProject = async (id, data) => {
    // buscar el projecto por id
    const project = await Project.findByPk(id);

    // comprobar que el projecto existe
    if (!project) throw new Error('No se encontró el projecto');

    // actualizar los valores del projecto
    const updatedProject = await project.update(data);

    // devolver el projecto actualizado
    return { msg: 'Proyecto actualizado correctamente' };
}


const updateValidate = async (id, newValidateValue) => {
    //
    const projectToUpdate = await Project.findByPk(id);
    if (!projectToUpdate) {
        throw new Error('No se encontró el proyecto');
    }
    projectToUpdate.validated = newValidateValue;
    await projectToUpdate.save();
    return { msg: 'Validacion actualizada correctamente' };
}

module.exports = {
    addProject,
    getProjectById,
    getAllProjects,
    searchProject,
    deleteProject,
    updateProject,
    updateValidate
}
