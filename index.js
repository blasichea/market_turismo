const express = require('express');
const bParser = require('body-parser');
const jwt = require('jsonwebtoken');
const secret = 'asd0192AB98lipoX';
const pathStatic = "ROOT_PATH/jwt/static/";

var app = express();

var usuarios = {
	pepe: {
		usuario: "pepe",
		password: "cuca",
		admin: false,
		nivel: 1
	},
	juan: {
		usuario: "juan",
		password: "popo",
		admin: true,
		nivel: 3
	}
}

/* MIDDLEWARES */

app.get('/login', (req, res) => {
	var user = usuarios[req.query.usuario];

	if (user.password === req.query.password) {
		var token = jwt.sign({user: user.usuario}, secret);
		console.log(token);
		res.sendFile(pathStatic + "index.html");
	}
});


function chkLogin(req, res, next){
	if (req.query.token) {
		var decode = jwt.verify(req.query.token, secret);
		console.log("Inicio: " + decode.user);
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