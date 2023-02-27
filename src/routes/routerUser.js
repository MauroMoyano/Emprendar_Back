const { Router } = require("express");
const { postUser } = require("../controllers/user/userHandler");
const routerUser = Router();

routerUser.post("/", postUser);

module.exports = routerUser;
