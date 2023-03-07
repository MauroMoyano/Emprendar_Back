const { Comment, User, Project } = require('../../db')

/* posteo del comentario, creacion */
const newComment = async function (data) {

    const { userId, projectId, comment } = data

    if (!comment.length || comment === ' ') {
        throw new Error('debes completar el campo antes de enviar')
    }

    let comm = await Comment.create({
        comment
    })

    let user = await User.findByPk(userId)
    let project = await Project.findByPk(projectId)

    console.log(project);


    await comm.setUser(user)
    await comm.setProject(project)

    return await Comment.findByPk(comm.id)

}


const getCommentByIdProject = async function (data) {

    let { projectId } = data

    return await Comment.findAll({
        where: {
            deletedAt: null,
            projectId
        }
    })
}


/* cambio del valor del commentario por parte de un usuario especifico, el mismo quien lo creó.
para mayor seguridad, nos podriamos preguntar si está activo el token con el cual el usuario inicia.
es decir, si su valro es "" o "<valor>" */
const changeComment = async function (data, id) {

    const { userId, projectId, comment } = data

    let thisComment = await Comment.findByPk(id)

    if (thisComment.userId !== userId || thisComment.projectId !== projectId) {
        throw new Error('no puedes cambiar este comentario')
    }
    if (!comment.length || comment === ' ') {
        throw new Error('debes completar el campo antes de enviar')
    }
    thisComment.comment = comment
    await thisComment.save()
    return thisComment
}


/* borrado del comentario */
const eliminateCommentController = async function (id) {
    await Comment.destroy({ where: { id } })
    return { id }
}


module.exports = {
    newComment,
    getCommentByIdProject,
    changeComment,
    eliminateCommentController
}