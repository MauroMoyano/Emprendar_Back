const { Router } = require("express");
const { postNewComment, updateComment, deleteComment,getCommentProject  } = require("../controllers/comment/commentHandler");
const routerComment = Router()

/* para postear comentarios a un proyecto desde un usuario auth 
TODO: aca vamos a tener que adicionar el comentario al arr de proyectos (estado de redux de project)
asi no realizar una nueva carga de datos a redux. se puede ver la forma de implementar*/
routerComment.post('/', postNewComment)
/* ruta innecesaria, no vamos a solicitar un detalle del comentario ahora. se van a 
pedir por cada proyecto */
/* routerComment.get('/:projectId',) */
routerComment.get('/:projectId', getCommentProject)
/* ruta de actualizacion de un comentario.
TODO: la idea es que cuando se actualice, dentro del estado de reduc, se actualice el por
el nuevo valor del comentario. la idea la tango para implementar */
routerComment.put('/:projectId', updateComment)
/* ruta de borrado lógico de un comentario */
routerComment.delete('/:projectId', deleteComment)


module.exports = routerComment