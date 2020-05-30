module.exports = (sequelize, DataTypes) => {
	var Paquete = sequelize.define('paquete', {
		destino: DataTypes.STRING,
		img: DataTypes.STRING,
		descripcion: DataTypes.TEXT,
		precio: DataTypes.INTEGER
	});

	return Paquete;
}