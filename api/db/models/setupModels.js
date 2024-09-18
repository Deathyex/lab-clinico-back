const { User, UserSchema } = require('./user.model');
const { Resultado, ResultadoSchema } = require('./resultado.model');
const { Examen, ExamenSchema } = require('./examen.model');
// importan todos los modelos

function setupModels(sequelize) {
	// Init
	User.init(UserSchema, User.config(sequelize));
	Examen.init(ExamenSchema, Examen.config(sequelize));
	Resultado.init(ResultadoSchema, Resultado.config(sequelize));

	// Esta función se registra con el método beforeValidate de Sequelize para que se ejecute antes de la validación del modelo
	User.beforeValidate((user, opciones) => {
		// Esta línea toma el valor de user.name y lo convierte a mayúsculas
		user.firstName = user.firstName.toUpperCase();
		user.lastName = user.lastName.toUpperCase();
		user.role = user.role.toUpperCase();
	});

	// Esta función se registra con el método beforeValidate de Sequelize para que se ejecute antes de la validación del modelo
	Examen.beforeValidate((examen, opciones) => {
		// Esta línea toma el valor de examen.name y lo convierte a minuscula
		examen.name = examen.name.toUpperCase();
	});

	// Associate
	Examen.asssociate(sequelize.models);
	Resultado.asssociate(sequelize.models);
	User.asssociate(sequelize.models);
}

module.exports = setupModels;
