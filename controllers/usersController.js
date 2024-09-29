// controllers/usersController.js

const { PrismaClient } = require('@prisma/client');
const { query } = require('express');

const prisma = new PrismaClient();

async function createSignIn(req, res) {
	const folders = await prisma.folder.findMany({
		where: {
			memberId: req.user.id, 
		},
		include: {
			files: true, 
		},
	});
	console.log(folders);
	console.log(folders.files);
	res.render('index', { user: req.user, folders: folders });
}

async function viewFile(req, res) {
    const fileId = req.query.id; 

    const file = await prisma.file.findUnique({
        where: {
            id: parseInt(fileId),
        },
    });
    console.log(file);
    res.render('file', { file: file });
}

module.exports = {
	createSignIn,
	viewFile,
};
