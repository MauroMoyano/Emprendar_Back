const { Router } = require("express");
const { postNewComment, updateComment, deleteComment, getCommentProject } = require("../controllers/comment/commentHandler");
const routerComment = Router()

/* para postear comentarios a un proyecto desde un usuario auth 
TODO: aca vamos a tener que adicionar el comentario al arr de proyectos (estado de redux de project)
asi no realizar una nueva carga de datos a redux. se puede ver la forma de implementar*/
routerComment.post('/', postNewComment)
/* ruta para solicitar los comentarios de cierto proyecto, debido a que en la relacion, no es podible
llamarlas por el lado del proyecto. */
routerComment.get('/:projectId', getCommentProject)
/* ruta de actualizacion de un comentario.
TODO: la idea es que cuando se actualice, dentro del estado de reduc, se actualice el por
el nuevo valor del comentario. la idea la tango para implementar */
routerComment.put('/:projectId', updateComment)
/* ruta de borrado lógico de un comentario */
routerComment.delete('/:projectId', deleteComment)


module.exports = routerComment