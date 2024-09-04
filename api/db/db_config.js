const { Sequelize } = require('sequelize');
const { config } = require('../config/config');
const { setupModels } = require('./models/setupModels');

// Extraer el nombre de usuario y contraseña de la configuración
const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);

// Construir la URI de la base de datos
const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

const sequelize = new Sequelize(URI);

// Exportar configuraciones para los entornos de desarrollo y producción
module.exports = {
	development: {
		url: URI,
		dialect: 'postgres'
	},
	production: {
		url: URI,
		dialect: 'postgres'
	}
};
