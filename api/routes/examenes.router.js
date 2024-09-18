const express = require('express');
const passport = require('passport');
const jwtStrategy = require('../strategies/jwt.strategy');
const ExamenService = require('./../services/examen.service');
const validatorHandler = require('./../middlewares/validator.handler');
const { checkRoles } = require('./../middlewares/roles.handler');
const {
	updateExamenSchema,
	createExamenSchema,
	getExamenSchema
} = require('./../schemas/examen.schema');

const router = express.Router(); // Creación del router
const examenService = new ExamenService(); // Instancia del servicio de exámenes

// Ruta para obtener todos los exámenes
router.get('/listAll', async (req, res, next) => {
	try {
		const resultados = await examenService.findAllExamenes();
		res.json(resultados);
	} catch (error) {
		next(error);
	}
});

// Ruta para obtener un examen por su ID
router.get(
	'/list/:id',
	validatorHandler(getExamenSchema, 'params'), // Validación del parámetro 'id'
	async (req, res, next) => {
		try {
			const { id } = req.params;
			const examen = await examenService.findExamenById(id);
			res.json(examen);
		} catch (error) {
			next(error);
		}
	}
);

// Ruta para crear un nuevo examen
router.post(
	'/create',
	passport.authenticate(jwtStrategy, { session: false }), // Autenticación con JWT
	checkRoles('ADMIN', 'ANALISTA'), // Verificación de roles
	validatorHandler(createExamenSchema, 'body'), // Validación del cuerpo de la solicitud
	async (req, res, next) => {
		try {
			const body = req.body;
			const newExamen = await examenService.createExamen(body);
			res.status(201).json(newExamen); // Respuesta con el examen creado
		} catch (error) {
			next(error);
		}
	}
);

// Ruta para actualizar un examen por su ID
router.patch(
	'/update/:id',
	passport.authenticate(jwtStrategy, { session: false }), // Autenticación con JWT
	checkRoles('ADMIN', 'ANALISTA'), // Verificación de roles
	validatorHandler(getExamenSchema, 'params'), // Validación del parámetro 'id'
	validatorHandler(updateExamenSchema, 'body'), // Validación del cuerpo de la solicitud
	async (req, res, next) => {
		try {
			const { id } = req.params;
			const body = req.body;
			const examen = await examenService.updateExamen(id, body);
			res.json(examen); // Respuesta con el examen actualizado
		} catch (error) {
			next(error);
		}
	}
);

// Ruta para eliminar un examen por su ID
router.delete(
	'/delete/:id',
	passport.authenticate(jwtStrategy, { session: false }), // Autenticación con JWT
	checkRoles('ADMIN', 'ANALISTA'), // Verificación de roles (solo para administradores)
	validatorHandler(getExamenSchema, 'params'), // Validación del parámetro 'id'
	async (req, res, next) => {
		try {
			const { id } = req.params;
			await examenService.deleteExamen(id);
			res.status(201).json({ id }); // Respuesta con el ID del examen eliminado
		} catch (error) {
			next(error);
		}
	}
);

module.exports = router; // Exportar el router para ser utilizado en otros archivos
