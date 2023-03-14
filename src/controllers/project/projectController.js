const { Promise } = require('bluebird')
const { Op, Sequelize } = require('sequelize')
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
/*  */
/* const getAllProjects2 = async () => {
    const { count, rows } = await Project.findAndCountAll({
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
    return rows
} */
/*  */
/* a incluir filtros tambien. */

const getAllProjects = async (data, pageNum = 4) => {
    //buscamos todos los projectos 
    /* if (!page) {
        const allProjects = await Project.findAll({
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
        return allProjects
    } */

    const { orden, page, country, category, search } = data

    let countryName = null;
    if (country) {
        countryName = country;
    }

    let categoryName = null;
    if (category) {
        categoryName = category;
    }

    let order = null;
    if (orden) {
        order = [['goal', orden]];
    }

    let offset = (page - 1) * pageNum;
    let limit = pageNum;

    let where1 = {
        where: {
            validated: 'aceptado',
            deletedAt: null
        }
    };
    let where2 = {
        where: {
            deletedAt: null
        }
    }
    let where3 = {
        where: {
            deletedAt: null,

        }

    }

    if (search && search.length > 0) {
        where1.where[`title`] = { [Op.iLike]: `%${search}%` }
    }

    if (countryName) {
        where2.where[`$name$`] = { [Op.iLike]: `%${country}%` };
    }

    if (categoryName) {
        where3.where[`name`] = { [Op.iLike]: `%${category}%` }

    }

    console.log(where1, where2, where3);

    const { count, rows } = await Project.findAndCountAll({
        offset,
        limit,
        order,
        include: [
            { model: Country, attributes: ['name'], where: where2.where },
            { model: User, attributes: ['id', 'user_name', 'profile_img'] },
            { model: Category, attributes: ['name'], where: where3.where, through: { attributes: [] } },
        ],
        where: where1.where
    })

    return {
        data: rows,
        pages: Math.ceil(count / pageNum),
    };

}

const getFilteredProjects = async (condition, pageNum = 4) => {

    const { orden, country, category/* , page  */ } = condition;


    let page = 1
    let offset = (page - 1) * pageNum;
    let limit = pageNum;

    if (isNaN(offset) || isNaN(limit)) {
        throw new Error('Error: offset or limit is not a number');
    }

    let thisOrder

    orden
        ? thisOrder = [['goal', orden]]
        : thisOrder = null

    let thisCountry

    country
        ? thisCountry = { name: country }
        : thisCountry = null

    let thisCategory

    category
        ? thisCategory = { name: category }
        : thisCategory = null

    console.log(
        'ordennnnn', thisOrder,
        'countryyyyy', thisCountry,
        'categoryyyyyy', thisCategory
    );

    const { count, rows } = await Project.findAndCountAll({
        offset,
        limit,
        order: thisOrder,
        where: {
            validated: 'aceptado',
            deletedAt: null,
        },
        include: [
            {
                model: Country,
                attributes: ['name'],
                where: thisCountry,
                required: true
            },
            {
                model: User,
                attributes: ['id', 'user_name', 'profile_img']
            },
            {
                model: Category,
                attributes: ['name'], through: { attributes: [] },
                where: thisCategory,
                required: true
            },
        ],
        /* group: 'project.id', */
    })

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


const getAllProjectsAdmin = async () => {
    //
    const projects = await Project.findAll();
    if (!projects) {
        throw new Error('No se encontró ningun proyecto');
    }

    return projects;
}


module.exports = {
    addProject,
    getProjectById,
    searchProject,
    deleteProject,
    updateProject,
    updateValidate,
    /* getAllProjects2, */
    /* filtros */
    getAllProjects,
    getFilteredProjects,

    getAllProjectsAdmin
}
