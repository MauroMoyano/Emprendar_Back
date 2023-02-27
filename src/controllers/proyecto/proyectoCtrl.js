const { Proyectos } = require('../../db')

exports.crearProyecto = async (data) => {


    //TODO crear validaciones

    try {
        const { titulo, resumen, descripcion, meta_fianaciamiento, imagen, usuarioId } = data

        // const usuarioId = req.body // despues va a vernir del req


        const proyecto = await Proyectos.create({
            titulo,
            resumen,
            descripcion,
            meta_fianaciamiento,
            imagen,
            usuarioId   // despues cambia esto lechu, no se si en la tabla esta como usuario_id o usuarioId, de igual forma el usuario no lo vamos a pasar por body, si no que lo vamos a pasar por req.usuario, que va a ser la instancia del usuario auntenticado



            //  algo asi ---> usuario_id = req.usuario.id
        })

        res.status(201).json({msg: `Proyecto creado Correctamente ${proyecto.titulo}`})
    } catch (error) {
        res.status(400).json({msg: 'Hubo un error al crear el proyecto'})
    }
}