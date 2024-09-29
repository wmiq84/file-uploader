// controllers/usersController.js

const db = require('../db/queries');

async function sayHello(req, res) {
	console.log("Hello World!");
    console.log(req)
    console.log(req.user)
    console.log(req.password)
    res.render('index', { user: req.user})
}

module.exports = {
    sayHello,
};