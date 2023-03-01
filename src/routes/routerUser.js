const { Router } = require("express");
const {
  postUserHanlder,
  getAllUsersHandler,
  getAllUserByIdHandler,
  putUserHandler,
  deleteUserHandler,
  confirmeUserHl,
  authUserHl
} = require("../controllers/user/userHandler");
const routerUser = Router();

routerUser.post("/", postUserHanlder);
routerUser.get("/", getAllUsersHandler);
routerUser.get("/:id", getAllUserByIdHandler);
routerUser.put("/:id", putUserHandler);
routerUser.delete("/:id", deleteUserHandler);


routerUser.get("/confirmar/:token", confirmeUserHl);
routerUser.post("/login", authUserHl);



module.exports = routerUser;
