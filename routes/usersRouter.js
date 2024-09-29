// routes/usersRouter.js
const { Router } = require("express");
const usersController = require("../controllers/usersController");
const usersRouter = Router();
const passport = require('../auth');

usersRouter.get("/", usersController.createSignIn);
// usersRouter.post("/", usersController.logIn);
usersRouter.post(
	'/log-in',
	passport.authenticate('local', {
		successRedirect: '/',
		failureRedirect: '/',
	})
);
usersRouter.get("/file", usersController.viewFile)

module.exports = usersRouter;