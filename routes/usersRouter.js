// routes/usersRouter.js
const { Router } = require("express");
const usersController = require("../controllers/usersController");
const usersRouter = Router();
const passport = require('../auth');
const express = require('express')
const app = express()
const multer  = require('multer')
const upload = multer()
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

usersRouter.get("/", usersController.createSignIn);
// usersRouter.post("/", usersController.logIn);

usersRouter.post('/', upload.single('file'), async (req, res) => {
	try {
		const { originalname, mimetype, size, path } = req.file;
		const userId = req.user.id; 
		const { folderId } = req.body;

		// Store file metadata in the database
		const file = await prisma.file.create({
			data: {
				name: originalname,
				size: size,
				upload: 10,
				folder: {
                    connect: { id: 1 },
                },
			},
		});

		res.status(200).send('File uploaded and stored in the database');
	} catch (error) {
		console.error(error);
		res.status(500).send('Error uploading file');
	}
});

usersRouter.post(
	'/log-in',
	passport.authenticate('local', {
		successRedirect: '/',
		failureRedirect: '/',
	})
);
usersRouter.get("/file", usersController.viewFile)

module.exports = usersRouter;