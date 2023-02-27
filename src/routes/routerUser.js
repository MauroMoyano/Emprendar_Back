const { Router } = require("express");
const {
  postUserHanlder,
  getAllUsersHandler,
  getAllUserByIdHandler,
} = require("../controllers/user/userHandler");
const routerUser = Router();

routerUser.post("/", postUserHanlder);
routerUser.get("/", getAllUsersHandler);
routerUser.get("/:id", getAllUserByIdHandler);

module.exports = routerUser;
