const { Proyects } = require('../../db')

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
    const proyecto = await Proyects.create({
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
    const proyect = await Proyects.findByPk(id)
    return proyect

}

const getAllProyects = async () => {
    //buscamos todos los proyectos
    const proyects = await Proyects.findAll()

        //si hay proyectos retornarlos
    if (proyects) return proyects
    //de lo contrario retornar este mensaje
    else  throw new Error ('No se encontraron proyectos')
}

const searchProyect = async (title) => {
    //buscamos el proyecto por el nombre
    const proyect = await Proyects.findOne({
        where: { title }
    })


    if(!proyect) throw new Error( 'No existe ningun proyecto con este nombre')

    return proyect 
}



module.exports = {
    addProyect,
    getProyectById,
    getAllProyects,
    searchProyect
}
