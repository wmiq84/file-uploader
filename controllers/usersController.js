// controllers/usersController.js

const { PrismaClient } = require('@prisma/client');
const { query } = require('express');
const path = require('path'); // Require the path module

const prisma = new PrismaClient();

async function createSignIn(req, res) {
	const folders = await prisma.folder.findMany({
		where: {
			memberId: 1, 
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

async function downloadFile(req, res) {
    const { id: fileId } = req.query;

    // Fetch the file details from the database using the fileId
    const file = await prisma.file.findUnique({
        where: {
            id: parseInt(fileId),
        },
    });

    // Check if the file exists and has a valid path
    if (!file || !file.path) {
        return res.status(404).send('File not found or path is invalid');
    }

    // Send the file to the user
    res.download(path.join(__dirname, '..', file.path), file.name);
}

module.exports = {
    downloadFile,
	createSignIn,
	viewFile,
};
