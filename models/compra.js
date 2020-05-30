module.exports = (sequelize, DataTypes) => {
	var Compra = sequelize.define('compra', {
		fecha:DataTypes.DATE,
		importe:DataTypes.INTEGER,
		medio: DataTypes.STRING
	});

	return Compra;
}