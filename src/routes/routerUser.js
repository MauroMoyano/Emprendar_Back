const { Router } = require("express");
const {
  postUserHanlder,
  getAllUsersHandler,
  getAllUserByIdHandler,
  putUserHandler,
  deleteUserHandler,
} = require("../controllers/user/userHandler");
const routerUser = Router();

routerUser.post("/", postUserHanlder);
routerUser.get("/", getAllUsersHandler);
routerUser.get("/:id", getAllUserByIdHandler);
routerUser.put("/:id", putUserHandler);
routerUser.delete("/:id", deleteUserHandler);

module.exports = routerUser;
