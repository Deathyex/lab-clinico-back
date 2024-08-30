const { Sequelize } = require('sequelize');
const { config } =  require('../config/config');

// Extraer el nombre de usuario y contraseña de la configuración
const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);

// Construir la URI de la base de datos
const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;
console.log(URI);


const sequelize = new Sequelize(URI)

/* async function testConnection(){
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}
testConnection() */

// Exportar configuraciones para los entornos de desarrollo y producción
module.exports = {
  development: {
    url: URI,
    dialect: 'postgres',
  },
  production: {
    url: URI,
    dialect: 'postgres',
  }
}
