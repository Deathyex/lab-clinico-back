const { Sequelize } = require('sequelize');

// Importar la configuración y los modelos de la base de datos
const { config } =  require('./../config/config');
const setupModels =  require('./../db/models');

// Codificar el nombre de usuario y la contraseña de la base de datos
const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);

// Construir la URI de conexión a la base de datos
const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

// Crear una nueva instancia de Sequelize
const sequelize = new Sequelize(URI,{
  dialect: 'postgres', // Indicar que se está usando PostgreSQL
  logging: console.log(), // Habilitar el registro de consultas en la consola
});

// Configurar los modelos en la instancia de Sequelize
setupModels(sequelize);

module.exports =  sequelize; // Exportar la instancia de Sequelize configurada

