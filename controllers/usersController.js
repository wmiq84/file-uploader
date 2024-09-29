// controllers/usersController.js

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function sayHello(req, res) {
    const folders = await prisma.folder.findMany({
        where: {
            memberId: req.user.id, // Assuming memberId is the correct field
        },
        include: {
            files: true, // Include the files in each folder
        },
    });
    console.log(folders);
    console.log(folders.files)
    res.render('index', { user: req.user, folders: folders})
}

module.exports = {
    sayHello,
};