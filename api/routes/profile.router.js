const express = require('express');
const passport = require('passport');

const ResultadosService = require('./../services/resultados.service');
const { config } = require('../config/config');

const router = express.Router(); // Creación del router
const resultadosService = new ResultadosService(); // Instancia del servicio de resultados

// Ruta para obtener los resultados del usuario autenticado
router.get(
	'/mis-resultados',
	passport.authenticate('jwt', { session: false }), // Autenticación con JWT
	async (req, res, next) => {
		try {
			const user = req.user; // Obtener el usuario autenticado del token JWT
			const resultados = await resultadosService.findByUser(user.sub); // Buscar resultados por el ID del usuario
			res.json(resultados); // Responder con los resultados encontrados
		} catch (error) {
			next(error); // Pasar el error al siguiente middleware
		}
	}
);

module.exports = router; // Exportar el router para ser utilizado en otros archivos
