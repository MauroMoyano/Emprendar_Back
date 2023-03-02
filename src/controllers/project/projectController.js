const { Project } = require('../../db')

const addProject = async (data) => {

    //TODO crear validaciones

    const { title, summary, description, goal, img, userId } = data

    //validacion precaria xd
    if (title === '' || summary === '' || description === '' || img === '' || userId === '') {
        return {
            msg: 'Todos los campos son obligatorios'
        }
    }

    //crear el projecto
    const projecto = await Project.create({
        title,
        summary,
        description,
        goal,
        img,
        userId: userId  //esto viene del user autenticado
    })
    return {
        msg: 'Projecto Creado correctamente'
    }
}


const getProjectById = async (id) => {
    //buscamos por el id
    const project = await Project.findByPk(id)
    return project

}


const getAllProjects = async () => {
    //buscamos todos los projectos
    const projects = await Project.findAll({
        where: {
            validated: 'aceptado',
            deletedAt: null
        }
    })
    console.log(projects);
    //si hay projectos retornarlos
    if (projects) return projects
    //de lo contrario retornar este mensaje
    else throw new Error('No se encontraron projectos')
}


const searchProject = async (projectTitle) => {
    //buscamos el projecto por el nombre
    console.log(projectTitle);
    let project = await Project.findAll({
        where: {
            deletedAt: null
        }
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
