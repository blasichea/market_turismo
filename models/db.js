const Sequelize = require('sequelize');
const sequelize = new Sequelize('mysql://acamica:AcamicA%232020@localhost:3306/turismo');
const db = {};

sequelize
	.authenticate()
	.then(() => {
		console.log('DB Iniciada con Exito');
	})
	.catch(err => {
		console.error('No se pudo conectar la DB');
	});


db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.usuario = sequelize.import("usuario.js");;
db.compra = sequelize.import("compra.js");;
db.paquete = sequelize.import("paquete.js");;

db.usuario.hasMany(db.compra);
db.compra.belongsTo(db.usuario);
db.compra.belongsTo(db.paquete);
db.paquete.hasMany(db.compra);

sequelize.sync();

module.exports = db;