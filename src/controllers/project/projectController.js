const { Promise } = require('bluebird')
const sequelize = require('sequelize')
const { Op, Sequelize } = require('sequelize')
const { Project, User, Country, Category } = require('../../db')

const addProject = async (data) => {

    //TODO crear validaciones

    console.log('aca esta la data', data)
    const { title, summary, description, goal, img, userId, country, category } = data
    //validacion precaria xd
    if (title === '' || summary === '' || description === '' || img === '' || userId === '') {
        return {
            msg: 'Todos los campos son obligatorios'
        }
    }
    let user = await User.findByPk(userId)
    let countries = await Country.findOne({ where: { name: country } })
    //crear el projecto
    let projecto
    
    if(img===null){
        projecto = await Project.create({
            title,
            summary,
            description,
            goal,
        })
    }else{
        projecto = await Project.create({
                title,
                summary,
                description,
                goal,
                img,
        })
    }
    

    if (category.length < 5) {
        let long = 5 - category.length
        for (let i = 0; i < long; i++) {
            let newNull = `null${i}`
            category.push(newNull)
        }
    }

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

const getAllProjects = async (data, pageNum = 4) => {
    //buscamos todos los projectos y los filtramos si recibimos en datos algo mas que page

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

    let id = await Category.findOne({ where: { name: category }, attributes: ['id'] })

    const { count, rows } = await Project.findAndCountAll({
        offset,
        limit,
        order,
        include: [
            { model: Country, attributes: ['name'], where: where2.where },
            { model: User, attributes: ['user_name', 'profile_img'], where: { confirmed: true, eliminatedByAdmin: false, deletedAt: null } },
            { model: Category, attributes: [], where: where3.where, through: { attributes: [] } },
        ],
        where: where1.where
    })

    let cantidad
    let result = []
    if (categoryName) {
        cantidad = count
        for (const res of rows) {
            let arrCategories = []
            let cat = await Category.findAll({
                attributes: ['name'],
                include: [
                    { model: Project, attributes: ['id'], where: { id: res.dataValues.id }, through: { attributes: [] } }
                ]
            })
            cat.map(cate => {
                if (!cate.dataValues.name.includes('null')) arrCategories.push({ name: cate.dataValues.name })
            })
            result.push({
                id: res.dataValues.id,
                title: res.dataValues.title,
                summary: res.dataValues.summary,
                description: res.dataValues.description,
                date: res.dataValues.data,
                goal: res.dataValues.goal,
                img: res.dataValues.img,
                userId: res.dataValues.userId,
                country: res.dataValues.country,
                user: res.dataValues.user,
                categories: arrCategories
            })
        }
    } else {
        cantidad = count / 5
        for (const res of rows) {
            let arrCategories = []
            let cat = await Category.findAll({
                attributes: ['name'],
                include: [
                    { model: Project, attributes: ['id'], where: { id: res.dataValues.id }, through: { attributes: [] } }
                ]
            })
            cat.map(cate => {
                if (!cate.dataValues.name.includes('null')) arrCategories.push({ name: cate.dataValues.name })
            })
            result.push({
                id: res.dataValues.id,
                title: res.dataValues.title,
                summary: res.dataValues.summary,
                description: res.dataValues.description,
                date: res.dataValues.data,
                goal: res.dataValues.goal,
                img: res.dataValues.img,
                userId: res.dataValues.userId,
                country: res.dataValues.country,
                user: res.dataValues.user,
                categories: arrCategories
            })
        }
    }
    console.log(cantidad);

    return {
        data: result,
        pages: Math.ceil(cantidad / pageNum),
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

    const projects = await Project.findAll({order : [['title', "ASC"]]});
    if (!projects) {
        throw new Error('No se encontró ningun proyecto');
    }
    return [...projects.sort((a,b)=> a.title.localeCompare(b.title))]
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
