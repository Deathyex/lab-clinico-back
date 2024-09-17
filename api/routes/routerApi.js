const express = require('express');

const resultadosRouter = require('./resultados.router'); // Importa el router de resultados
const usersRouter = require('./users.router'); // Importa el router de usuarios
const examenesRouter = require('./examenes.router'); // Importa el router de exámenes
const authRouter = require('./auth.router'); // Importa el router de autenticación

function routerApi(app) {
	const router = express.Router(); // Crea un nuevo router de Express
	app.use('/api/v1', router); // Monta el router en la ruta base '/api/v1'
	router.use('/resultados', resultadosRouter); // Usa el router de resultados en la ruta '/resultados'
	router.use('/users', usersRouter); // Usa el router de usuarios en la ruta '/users'
	router.use('/examenes', examenesRouter); // Usa el router de exámenes en la ruta '/examenes'
	router.use('/auth', authRouter); // Usa el router de autenticación en la ruta '/auth'
}

module.exports = routerApi; // Exporta la función routerApi
