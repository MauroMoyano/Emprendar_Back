const { Proyect } = require('../../db')

const addProyect = async (data) => {

    //TODO crear validaciones

    const { title, summary, description, goal, img, userId } = data

    //validacion precaria xd
    if (title === '' || summary === '' || description === '' || img === '' || userId === '') {
        return {
            msg: 'Todos los campos son obligatorios'
        }
    }

    //crear el proyecto
    const proyecto = await Proyect.create({
        title,
        summary,
        description,
        goal,
        img,
        userId: userId  //esto viene del user autenticado
    })
    return {
        msg: 'Proyecto Creado correctamente'
    }
}


const getProyectById = async (id) => {
    //buscamos por el id
    const proyect = await Proyect.findByPk(id)
    return proyect

}

const getAllProyects = async () => {
    //buscamos todos los proyectos
    const proyects = await Proyect.findAll({
        where: {
            deletedAt: null
        }
    })

    //si hay proyectos retornarlos
    if (proyects) return proyects
    //de lo contrario retornar este mensaje
    else throw new Error('No se encontraron proyectos')
}

const searchProyect = async (proyectTitle) => {
    //buscamos el proyecto por el nombre
    let proyect = await Proyect.findAll({
        where: {
            detetedAt: null
        }
    })

    proyect = proyect.filter(pj => pj.dataValues.title.includes(proyectTitle))

    if (!proyect) throw new Error('No existe ningun proyecto con este nombre')

    return proyect
}


//funcion borrar proyect
const deleteProyect = async (id) => {

    const proyectDelete = await Proyect.findOne({
        where: {
            id: id
        }
    })

    if (proyectDelete) {
        await Proyect.destroy({
            where: {
                id: id
            }
        })
    } else {
        throw new Error('No existe el proyecto a eliminar')
    }
}

const updateProyect = async (id, data) => {
    // buscar el proyecto por id
    const proyect = await Proyect.findByPk(id);
  
    // comprobar que el proyecto existe
    if (!proyect) throw new Error('No se encontró el proyecto');
  
    // actualizar los valores del proyecto
    const updatedProyect = await proyect.update(data);
  
    // devolver el proyecto actualizado
    return updatedProyect;
  }


  const updateValidate = async (id, newValidateValue) => {
        //
    const projectToUpdate = await Proyect.findByPk(id);
    if (!projectToUpdate) {
      throw new Error('No se encontró el proyecto');
    }
    projectToUpdate.validate = newValidateValue;
    await projectToUpdate.save();
    return projectToUpdate;
  }

module.exports = {
    addProyect,
    getProyectById,
    getAllProyects,
    searchProyect,
    deleteProyect,
    updateProyect,
    updateValidate
}
