const { Usuarios } = require('../../db')


exports.crearUsuario = async (data) => {

    //TODO crear validaciones

    try {

        const { } = data
            usuario = await Usuarios.create({
                nombre,
                correo,
                password
            })
            res.status(201).json({usuario})
        }

    catch (error) {

        res.status(400).json({ msg: 'Error al crear usuario' })
    }

}