const { Router } = require("express");
const { postUser } = require("../controllers/user/userHandler");
const routerUser = Router();

router.post("/", postUser);

module.exports = routerUser;
