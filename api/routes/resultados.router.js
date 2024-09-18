const express = require('express');
const passport = require('passport');

const ResultadosService = require('./../services/resultados.service');

const validatorHandler = require('../middlewares/validator.handler');
const { checkRoles } = require('./../middlewares/roles.handler');
const {
	createResultadoSchema,
	updateResultadoSchema,
	getResultadoSchema,
	queryResultadoSchema
} = require('./../schemas/resultado.schema');

const router = express.Router(); // Creación del router
const resultadosService = new ResultadosService(); // Instancia del servicio de resultados

// Middleware para la carga de archivos
//router.use(fileUpload());

// Ruta para obtener todos los resultados (con validaciones de rol y esquema de consulta)
router.get(
	'/listAll',
	passport.authenticate('jwt', { session: false }), // Autenticación con JWT
	checkRoles('ADMIN', 'ANALISTA'), // Verificación de roles permitidos
	validatorHandler(queryResultadoSchema, 'query'), // Validación del query string
	async (req, res, next) => {
		try {
			const resultados = await resultadosService.findAllResultados(req.query); // Buscar resultados con el query string
			res.json(resultados); // Responder con los resultados encontrados
		} catch (error) {
			next(error); // Pasar el error al siguiente middleware
		}
	}
);

// Ruta para obtener los resultados de un paciente por su ID
router.get(
	'/list/:idPaciente',
	passport.authenticate('jwt', { session: false }), // Autenticación con JWT
	checkRoles('ADMIN', 'ANALISTA', 'PACIENTE'), // Verificación de roles permitidos
	async (req, res, next) => {
		try {
			const { idPaciente } = req.params;
			const resultados = await resultadosService.findResultadosByUserId(
				idPaciente
			); // Buscar resultados por el ID del paciente
			res.json(resultados); // Responder con los resultados encontrados
		} catch (error) {
			next(error); // Pasar el error al siguiente middleware
		}
	}
);

// Ruta para crear un nuevo resultado
router.post(
	'/create',
	passport.authenticate('jwt', { session: false }), // Autenticación con JWT
	checkRoles('ADMIN', 'ANALISTA', 'PACIENTE'), // Verificación de roles permitidos
	validatorHandler(createResultadoSchema, 'body'), // Validación del cuerpo de la solicitud
	async (req, res, next) => {
		try {
			const body = req.body;
			const newResultado = await resultadosService.createResultado(body); // Crear un nuevo resultado
			resultadosService.sendNewResultado(body.userId); // Enviar notificación por correo electrónico
			res.status(201).json(newResultado); // Responder con el resultado creado
		} catch (error) {
			next(error); // Pasar el error al siguiente middleware
		}
	}
);

// Ruta para actualizar un resultado
router.patch(
	'/update/:idResultado',
	passport.authenticate('jwt', { session: false }), // Autenticación con JWT
	checkRoles('ADMIN', 'ANALISTA'), // Verificación de roles permitidos
	validatorHandler(getResultadoSchema, 'params'), // Validación de los parámetros de la solicitud
	validatorHandler(updateResultadoSchema, 'body'), // Validación del cuerpo de la solicitud
	async (req, res, next) => {
		try {
			const { idResultado } = req.params;
			const body = req.body;
			const resultado = await resultadosService.update(idResultado, body); // Actualizar un resultado
			res.json(resultado); // Responder con el resultado actualizado
		} catch (error) {
			next(error); // Pasar el error al siguiente middleware
		}
	}
);

// Ruta para eliminar un resultado
router.delete(
	'/delete/:idResultado',
	passport.authenticate('jwt', { session: false }), // Autenticación con JWT
	checkRoles('ADMIN', 'ANALISTA'), // Verificación de roles permitidos
	validatorHandler(getResultadoSchema, 'params'), // Validación de los parámetros de la solicitud
	async (req, res, next) => {
		try {
			console.log('aaaaa');
			const { idResultado } = req.params;
			await resultadosService.delete(idResultado); // Eliminar un resultado
			res.status(201).json({ idResultado }); // Responder con el ID del resultado eliminado
		} catch (error) {
			next(error); // Pasar el error al siguiente middleware
		}
	}
);

module.exports = router; // Exportar el router para ser utilizado en otros archivos
