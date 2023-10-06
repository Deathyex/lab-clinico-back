const express = require('express');
const passport = require('passport');

const ExamenService = require('./../services/examen.service');
const validatorHandler = require('./../middlewares/validator.handler');
const { checkRoles } = require('./../middlewares/auth.handler');
const { updateExamenSchema, createExamenSchema, getExamenSchema } = require('./../schemas/examen.schema');

const router = express.Router(); // Creación del router
const service = new ExamenService(); // Instancia del servicio de exámenes

// Ruta para obtener todos los exámenes
router.get('/',
  passport.authenticate('jwt', {session: false}), // Autenticación con JWT
  async (req, res, next) => {
    try {
      const resultados = await service.find();
      res.json(resultados);
    } catch (error) {
      next(error);
    }
});

// Ruta para obtener un examen por su ID
router.get('/:id',
  passport.authenticate('jwt', {session: false}), // Autenticación con JWT
  validatorHandler(getExamenSchema, 'params'), // Validación del parámetro 'id'
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const examen = await service.findOne(id);
      res.json(examen);
    } catch (error) {
      next(error);
    }
  }
);

// Ruta para crear un nuevo examen
router.post('/',
  passport.authenticate('jwt', {session: false}), // Autenticación con JWT
  checkRoles('ADMIN'), // Verificación de roles (solo para administradores)
  validatorHandler(createExamenSchema, 'body'), // Validación del cuerpo de la solicitud
  async (req, res, next) => {
    try {
      const body = req.body;
      const newExamen = await service.create(body);
      res.status(201).json(newExamen); // Respuesta con el examen creado
    } catch (error) {
      next(error);
    }
  }
);

// Ruta para actualizar un examen por su ID
router.patch('/:id',
  passport.authenticate('jwt', {session: false}), // Autenticación con JWT
  checkRoles('ADMIN'), // Verificación de roles (solo para administradores)
  validatorHandler(getExamenSchema, 'params'), // Validación del parámetro 'id'
  validatorHandler(updateExamenSchema, 'body'), // Validación del cuerpo de la solicitud
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const examen = await service.update(id, body);
      res.json(examen); // Respuesta con el examen actualizado
    } catch (error) {
      next(error);
    }
  }
);

// Ruta para eliminar un examen por su ID
router.delete('/:id',
  passport.authenticate('jwt', {session: false}), // Autenticación con JWT
  checkRoles('ADMIN'), // Verificación de roles (solo para administradores)
  validatorHandler(getExamenSchema, 'params'), // Validación del parámetro 'id'
  async (req, res, next) => {
    try {
      const { id } = req.params;
      await service.delete(id);
      res.status(201).json({id}); // Respuesta con el ID del examen eliminado
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router; // Exportar el router para ser utilizado en otros archivos
