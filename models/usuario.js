module.exports = (sequelize, DataTypes) => {

	var Usuario = sequelize.define('usuario', {
		nombre:DataTypes.STRING,
		clave:DataTypes.STRING,
		admin:DataTypes.BOOLEAN
	});

	return Usuario;
}