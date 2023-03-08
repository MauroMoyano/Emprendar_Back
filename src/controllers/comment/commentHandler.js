const { getCommentByIdProject ,newComment, changeComment, eliminateCommentController } = require("./commentController")



const getCommentProject = async (req, res) => {

    try {
        let result = await getCommentByIdProject(req.params)
        res.status(201).json(result)
    } catch (error) {
        res.status(406).json({ error: error.message })

    }
}







/* se crea un nuevo comentario, en el cual ademas de devolver un "msg" devolvemos lo que 
defini como "toRedux", que vendria a contener los datos del nuevo comentario. el mismo se manda asi
para poder buscar entre el arr de project del estado de redux y poder sumarlo al mismo*/
const postNewComment = async (req, res) => {

    try {
        let result = await newComment(req.body)
        res.status(201).json({ msg: 'posteo realizado con éxito', toRedux: result })
    } catch (error) {
        res.status(406).json({ error: error.message })
    }
}

/* el cambio del valor del comentario, al igual que en el posteo, se manda nuevamente los datos 
para asi poder "actualizarlos" en el estado de redux de project, sin volver a cargar tooodos los datos
la idea seria esa */
/* att, esta ruta recibe 2 req. un body y un params, el params es el id del comentario */
const updateComment = async (req, res) => {
    let { projectId } = req.params
    try {
        let result = await changeComment(req.body, projectId)
        res.status(201).json({ msg: 'cambios subidos con éxito', toRedux: result })
    } catch (error) {
        res.status(406).json({ error: error.message })
    }
}

/* borrado lógico del comentario. a básocas, el comentario deja de estar. habria que ver de hacer un filtrado
en el estado de redux de los projectos, el comentario.id */
const deleteComment = async (req, res) => {
    let { projectId } = req.params
    try {
        let result = await eliminateCommentController(projectId)
        res.status(201).json({ msg: 'se elimino el comentario solicitado', toRedux: result })
    } catch (error) {
        res.status(406).json({ error: error.message })
    }
}

module.exports = {
    postNewComment,
    updateComment,
    deleteComment,
    getCommentProject
}