// routes/usersRouter.js
const { Router } = require("express");
const usersController = require("../controllers/usersController");
const usersRouter = Router();

usersRouter.get("/", usersController.sayHello);
// usersRouter.post("/", usersController.logIn);

module.exports = usersRouter;