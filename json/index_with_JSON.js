const express = require('express');
const bParser = require('body-parser');
const jwt = require('jsonwebtoken');
const path = require('path');

const secreto = 'asd0192AB98lipoX';

var app = express();

app.use(express.static(path.join(__dirname, 'static/css')));
app.use(express.static(path.join(__dirname, 'static/assets')));
app.use(express.static(path.join(__dirname, 'static/scripts')));


app.use(bParser.json());


/* MIDDLEWARES */

function chkLogin(req, res, next){
	console.log("chequeo");
	if (req.query.token) {
		var decode = jwt.verify(req.query.token, secreto);
		console.log("Inicio: " + decode.usuario);
		req.usuario = decode.usuario;
		next();
	} else {
		res.sendFile(path.join(__dirname, "static/login.html"));
	}
}


function chkUsuario(req, res, next){
	var usuario = req.params.usuario;

	if (!usuarios[req.usuario].admin && usuario != req.usuario) {
		res.status(400);
		res.send("Acceso denegado");
	}
	next();
}


function chkAdmin(req, res, next){
	var token = req.query.token;
	if (token) {
		var usuario = jwt.verify(token, secreto).usuario;
		if (usuarios[usuario].admin) {
			req.usuario = usuario;
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


/* RUTAS */

/* RUTAS SIN MIDDLEWARE */

app.get('/login', (req, res) => {
	res.sendFile(path.join(__dirname, "static/login.html"));
});


app.post('/login', (req, res) => {
	const { usuario, clave } = req.body;

	if (!usuario || !clave) {
		/* res.status(400); */
		res.json("Usuario o contraseña incorrectos");
	} else if (usuarios[usuario]) {
		if (usuarios[usuario].clave === clave) {
			var token = jwt.sign({usuario: usuario}, secreto);
			console.log(token);
			res.json({usuario: usuario, token: token});
		} else {
			/* res.status(400); */
			res.json("Usuario o contraseña incorrectos");
		}
	} else {
		res.json("Usuario o contraseña incorrectos");
	}
});


/* RUTAS CON MIDDLEWARE */

app.get('/', chkLogin, (req, res) => {

	res.sendFile(path.join(__dirname, "static/index.html"));
});


app.get('/administrar', chkAdmin, (req, res) => {
	res.sendFile(path.join(__dirname, "static/admin.html"));
});


app.put('/usuarios/:usuario', chkLogin, chkUsuario,(req, res) => {

	if (usuarios[req.usuario].admin) {
		const {nivel, admin} = req.body;
		if (nivel) {
			usuarios[req.params.usuario].nivel = nivel;
			console.log("cambio Nivel: " + nivel);
		}
		if (admin != undefined) {
			usuarios[req.params.usuario].admin = admin;
			console.log("cambio Admin: " + admin);
		}
	} 
	if (req.usuario === req.params.usuario) {
		const {clave} = req.body;
		if (clave) {
			usuarios[req.usuario].clave = clave;
			console.log("cambio clave: " + clave);
		}
	}
	console.log("PUT usuario");
	res.json(usuarios[req.params.usuario]);
});


app.get('/usuarios', chkAdmin, (req, res) => {

	res.json(totalUsuarios());
});


app.get('/usuarios/:usuario', chkLogin, chkUsuario, (req, res) => {
	var usuarioParam = req.params.usuario;
	const {usuario, admin, nivel, compras} = usuarios[usuarioParam];
	res.json({
		usuario: usuario,
		admin: admin,
		nivel: nivel,
		compras: compras
	});
});


app.get('/compras/:usuario', chkLogin, chkUsuario, (req, res) => {
	var usuario = req.params.usuario;

	res.json({usuario: usuario, compras: usuarios[usuario].compras});
});


app.get('/compras', chkAdmin, (req, res) => {

	res.json(totalCompras());
});


app.post('/paquetes', chkAdmin, (req, res) => {
	const {destino, img, descripcion, precio} = req.body;
	var id = destino.replace(/ /g,'');

	paquetes[id] = {
		destino: destino,
		img: img,
		descripcion: descripcion,
		precio: precio
	}
	res.json(paquetes[id]);
});


app.get('/paquetes', chkLogin, (req, res) => {

	res.json(paquetes)
});


app.get('/paquetes/:destino', chkLogin, (req, res) => {
	var destino = req.params.destino.replace(/ /g,'');

	if (paquetes[destino]) {
		res.json(paquetes[destino]);
	} else {
		res.status(400);
		res.send("No se encontró el paquete");
	}
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


function totalUsuarios(){
	var result = [];
	for (const us in usuarios) {
		result.push(us);
	}
	console.log(result);
	return result;
}


/* SERVIDOR ESCUCHANDO */
app.listen(3000, () => {
	console.log('Servidor Iniciado');
});