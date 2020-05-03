const express = require('express');
const bParser = require('body-parser');
const jwt = require('jsonwebtoken');
const secret = 'asd0192AB98lipoX';
const path = require('path');

var app = express();

app.use(express.static(path.join(__dirname, 'static/css')));
app.use(express.static(path.join(__dirname, 'static/assets')));
app.use(express.static(path.join(__dirname, 'static/scripts')));


app.use(bParser.json());


var usuarios = {
	sole: {
		usuario: "sole",
		password: "poncho",
		admin: false,
		nivel: 1,
		compras: []
	},
	maria: {
		usuario: "maria",
		password: "pururu",
		admin: false,
		nivel: 1,
		compras: []
	},
	rene: {
		usuario: "rene",
		password: "ranita123",
		admin: false,
		nivel: 1,
		compras: []
	},
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
		compras: [		]
	}
}


var paquetes = {
	cordoba: {
		destino: "Córdoba",
		img: "cordoba.jpg",
		descripcion: "Córdoba, la capital de la provincia argentina del mismo nombre, es conocida por su arquitectura colonial española. Alberga la Manzana Jesuítica, un complejo del siglo XVII con claustros activos, iglesias y el campus original de la Universidad Nacional de Córdoba, una de las universidades más antiguas de Sudamérica.",
		precio: 10.000
	},
	mendoza: {
		destino: "Mendoza",
		img: "mendoza.jpg",
		descripcion: "Mendoza es una ciudad de la región de Cuyo en Argentina y es el corazón de la zona vitivinícola argentina, famosa por sus Malbecs y otros vinos tintos. Sus distintas bodegas ofrecen degustaciones y visitas guiadas.",
		precio: 11.500
	},
	bsas: {
		destino: "Buenos Aires",
		img: "bsas2.jpg",
		descripcion: "¿Te gustaría conocer la Ciudad de Buenos Aires y no tienes mucho tiempo? Con este recorrido podrás disfrutar del pasado y el presente de la ciudad. Podrás conocer algunos de los símbolos de la ciudad como el Obelisco, el Teatro Colón, la Plaza de Mayo y muchos más.",
		precio: 12.000
	},
	roma: {
		destino: "Roma",
		img: "roma.jpeg",
		descripcion: "Roma, la capital de Italia, es una extensa ciudad cosmopolita que tiene a la vista casi 3,000 años de arte, arquitectura y cultura de influencia mundial. Las ruinas antiguas como las del Foro y el Coliseo evocan el poder del antiguo Imperio Romano.",
		precio: 75.000
	},
	paris: {
		destino: "Paris",
		img: "paris.jpg",
		descripcion: "París, la capital de Francia, es una importante ciudad europea y un centro mundial del arte, la moda, la gastronomía y la cultura. Su paisaje urbano del siglo XIX está entrecruzado por amplios bulevares y el río Sena.",
		precio: 90.000
	},
	egipto: {
		destino: "Egipto",
		img: "egipto.jpg",
		descripcion: "Egipto, país que une el noreste de África con Medio Oriente, data del período de los faraones. Tiene monumentos de milenios de antigüedad ubicados junto al fértil valle del río Nilo, incluidas las colosales pirámides de Guiza y la Gran Esfinge, al igual que las tumbas del Valle de los Reyes.",
		precio: 120.000
	}
}


/* RUTAS SIN MIDDLEWARE */


app.get('/login', (req, res) => {
	res.sendFile(path.join(__dirname, "static/login.html"));
});


app.post('/login', (req, res) => {
	var { user, password } = req.body;

	if (!user || !password) {
		res.status(400);
		res.send("Usuario o contraseña incorrectos");
	} else {
		if (usuarios[user].password === password) {
			var token = jwt.sign({user: user.usuario}, secret);
			console.log(token);
			res.json({usuario: user, token: token});
		} else {
			res.status(400);
			res.send("Usuario o contraseña incorrectos");
		}
	}
});


/* MIDDLEWARES */


function chkLogin(req, res, next){
	console.log("chequeo");
	if (req.query.token) {
		var decode = jwt.verify(req.query.token, secret);
		console.log("Inicio: " + decode.user);
		req.user = decode.user;
		next();
	} else {
		res.sendFile(path.join(__dirname, "static/login.html"));
	}
}


function chkUser(req, res, next){
	var user = req.params.user;

	if (!usuarios[req.user].admin || user != req.user) {
		res.status(400);
		res.send("Acceso denegado");
	}
	next();
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


/* RUTAS */

app.get('/', (req, res) => {

	res.sendFile(path.join(__dirname, "static/index.html"));
});


app.get('/usuarios', chkAdmin, (req, res) => {
	
	res.json(totalUsuarios);
});


app.get('/usuarios/:user', chkLogin, chkUser, (req, res) => {
	var user = req.params.user;
	const {usuario, admin, nivel, compras} = usuarios[user];
	res.json({
		usuario: usuario,
		admin: admin,
		nivel: nivel,
		compras: compras
	});
});


app.get('/compras/:user', chkLogin, chkUser, (req, res) => {
	var user = req.params.user;

	res.json({usuario: user, compras: usuarios[user].compras});
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