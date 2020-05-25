const express = require('express');
const bParser = require('body-parser');
const jwt = require('jsonwebtoken');
const path = require('path');
const Sequelize = require('sequelize');
const sequelize = new Sequelize('mysql://acamica:AcamicA%232020@localhost:3306/turismo');
const Model = Sequelize.Model;

const secreto = 'asd0192AB98lipoX';

var app = express();

app.use(express.static(path.join(__dirname, 'static/css')));
app.use(express.static(path.join(__dirname, 'static/assets')));
app.use(express.static(path.join(__dirname, 'static/scripts')));


app.use(bParser.json());

sequelize
	.authenticate()
	.then(() => {
		console.log('DB Iniciada con Exito');
	})
	.catch(err => {
		console.error('No se pudo conectar la DB');
	});

class Usuario extends Model {}
Usuario.init ({
	nombre:{
		type: Sequelize.STRING
	},
	clave:{
		type: Sequelize.STRING
	},
	admin:{
		type: Sequelize.BOOLEAN
	}
},{
	sequelize,
	modelName: 'usuario'
});


class Paquete extends Model {}
Paquete.init ({
	destino:{
		type: Sequelize.STRING
	},
	img:{
		type: Sequelize.STRING
	},
	descripcion:{
		type: Sequelize.TEXT
	},
	precio:{
		type: Sequelize.INTEGER
	}
},{
	sequelize,
	modelName: 'paquete'
});


class Compra extends Model {}
Compra.init ({
	fecha:{
		type: Sequelize.DATE
	},
	importe:{
		type: Sequelize.INTEGER
	},
	medio:{
		type: Sequelize.STRING
	}
},{
	sequelize,
	modelName: 'compra'
});



Usuario.hasMany(Compra);
Compra.belongsTo(Usuario);

Compra.belongsTo(Paquete);
Paquete.hasMany(Compra);

sequelize.sync();

var usuarios = {
	sole: {
		usuario: "sole",
		clave: "poncho",
		admin: false,
		nivel: 1,
		compras: []
	},
	maria: {
		usuario: "maria",
		clave: "pururu",
		admin: false,
		nivel: 1,
		compras: []
	},
	rene: {
		usuario: "rene",
		clave: "ranita123",
		admin: false,
		nivel: 1,
		compras: []
	},
	pepe: {
		usuario: "pepe",
		clave: "cuca",
		admin: false,
		nivel: 1,
		compras: []
	},
	juan: {
		usuario: "juan",
		clave: "popo",
		admin: true,
		nivel: 3,
		compras: [		]
	}
}


var paquetes = {
	Córdoba: {
		destino: "Córdoba",
		img: "cordoba.jpg",
		descripcion: "Córdoba, la capital de la provincia argentina del mismo nombre, es conocida por su arquitectura colonial española. Alberga la Manzana Jesuítica, un complejo del siglo XVII con claustros activos, iglesias y el campus original de la Universidad Nacional de Córdoba, una de las universidades más antiguas de Sudamérica.",
		precio: 10000
	},
	Mendoza: {
		destino: "Mendoza",
		img: "mendoza.jpg",
		descripcion: "Mendoza es una ciudad de la región de Cuyo en Argentina y es el corazón de la zona vitivinícola argentina, famosa por sus Malbecs y otros vinos tintos. Sus distintas bodegas ofrecen degustaciones y visitas guiadas.",
		precio: 11500
	},
	BuenosAires: {
		destino: "Buenos Aires",
		img: "bsas2.jpg",
		descripcion: "¿Te gustaría conocer la Ciudad de Buenos Aires y no tienes mucho tiempo? Con este recorrido podrás disfrutar del pasado y el presente de la ciudad. Podrás conocer algunos de los símbolos de la ciudad como el Obelisco, el Teatro Colón, la Plaza de Mayo y muchos más.",
		precio: 12000
	},
	Roma: {
		destino: "Roma",
		img: "roma.jpeg",
		descripcion: "Roma, la capital de Italia, es una extensa ciudad cosmopolita que tiene a la vista casi 3,000 años de arte, arquitectura y cultura de influencia mundial. Las ruinas antiguas como las del Foro y el Coliseo evocan el poder del antiguo Imperio Romano.",
		precio: 75000
	},
	Paris: {
		destino: "Paris",
		img: "paris.jpg",
		descripcion: "París, la capital de Francia, es una importante ciudad europea y un centro mundial del arte, la moda, la gastronomía y la cultura. Su paisaje urbano del siglo XIX está entrecruzado por amplios bulevares y el río Sena.",
		precio: 90000
	},
	Egipto: {
		destino: "Egipto",
		img: "egipto.jpg",
		descripcion: "Egipto, país que une el noreste de África con Medio Oriente, data del período de los faraones. Tiene monumentos de milenios de antigüedad ubicados junto al fértil valle del río Nilo, incluidas las colosales pirámides de Guiza y la Gran Esfinge, al igual que las tumbas del Valle de los Reyes.",
		precio: 120000
	}
}


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