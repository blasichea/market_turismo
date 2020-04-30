const express = require('express');
const bParser = require('body-parser');
const jwt = require('jsonwebtoken');
const secret = 'asd0192AB98lipoX';
const pathStatic = "C:/Users/20314058810/Desktop/CODE/jwt/static/";

var app = express();

var usuarios = {
	pepe: {
		password: "cuca",
		admin: false,
		nivel: 1
	},
	juan: {
		password: "popo",
		admin: true,
		nivel: 3
	}
}

/* MIDDLEWARES */

app.get('/login', (req, res) => {
	var user = usuarios[req.query.usuario];

	if (user.password === req.query.password) {
		var token = jwt.sign({user: user}, secret);
		console.log(token);
	}
});


function chkLogin(req, res, next){
	if (req.query.token) {
		var decode = jwt.verify(req.query.token, secret);
		console.log(decode);
		next();
	} else {
		res.sendFile(pathStatic + "login.html");
	}
}

app.use(chkLogin);

/* RUTAS */

app.get('/', (req, res) => {

	res.sendFile(pathStatic + "index.html");
});


/* SERVIDOR ESCUCHANDO */
app.listen(3000, () => {
	console.log('Servidor Iniciado');
});