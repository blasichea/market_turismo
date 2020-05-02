const express = require('express');
const bParser = require('body-parser');
const jwt = require('jsonwebtoken');
const secret = 'asd0192AB98lipoX';
const pathStatic = "/home/andres/Escritorio/FULL STACK/actividades/Market/market_turismo/static/";

var app = express();

var usuarios = {
	pepe: {
		usuario: "pepe",
		password: "cuca",
		admin: false,
		nivel: 1,
		compras: []
	},
	juan: {
		usuario: "juan",
		password: "popo",
		admin: true,
		nivel: 3,
		compras: []
	}
}


app.get('/login', (req, res) => {
	var user = usuarios[req.query.usuario];

	if (user.password === req.query.password) {
		var token = jwt.sign({user: user.usuario}, secret);
		console.log(token);
		res.sendFile(pathStatic + "index.html");
	} else {
		res.status(400);
		res.send("Usuario o contraseña incorrectos");
	}
});

/* MIDDLEWARES */

function chkLogin(req, res, next){
	console.log("chequeo");
	if (req.query.token) {
		var decode = jwt.verify(req.query.token, secret);
		console.log("Inicio: " + decode.user);
		next();
	} else {
		res.sendFile(pathStatic + "login.html");
	}
}


function chkAdmin(req, res, next){
	var token = req.query.token;
	if (token) {
		var user = jwt.verify(token, secret).user;
		if (usuarios[user].admin) {
			req.user = user;
			next();
		} else {
			res.status(400);
			res.send("Permiso denegado");
		}
	} else {
		res.status(400);
		res.send("Es necesario un token de seguridad");
	}
}



app.use(chkLogin);

/* RUTAS */

app.get('/', (req, res) => {

	res.sendFile(pathStatic + "index.html");
});


app.get('/compras', chkAdmin, (req, res) => {

	res.json(totalCompras());
});


/* FUNCIONES AUXILIARES */

function totalCompras(){
	var result = [];
	for (const us in usuarios) {
		result.push({usuario: us, compras: usuarios[us].compras});
	}
	console.log(result);
	return result;
}


/* SERVIDOR ESCUCHANDO */
app.listen(3000, () => {
	console.log('Servidor Iniciado');
});