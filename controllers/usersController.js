// controllers/usersController.js

const db = require('../db/queries');

async function sayHello(req, res) {
	console.log("Hello World!");
    res.render('index', { member: req.member})
}

module.exports = {
    sayHello,
};