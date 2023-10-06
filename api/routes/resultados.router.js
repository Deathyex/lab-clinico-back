const express = require("express");
const passport = require('passport');
const fileUpload = require('express-fileupload');

const ResultadosService = require('./../services/resultados.service');
const AuthService = require('./../services/auth.service');
const { uploadFile, getFiles, getFile, downloadFile, getFileURL } =  require('../../s3')

const validatorHandler = require('../middlewares/validator.handler');
const { checkRoles } = require('./../middlewares/auth.handler');
const { createResultadoSchema, updateResultadoSchema, getResultadoSchema, queryResultadoSchema } = require('./../schemas/resultado.schema');

const router = express.Router(); // Creación del router
const service =  new ResultadosService(); // Instancia del servicio de resultados
const authService = new AuthService(); // Instancia del servicio de autenticación

// Middleware para la carga de archivos
router.use(fileUpload());

// Ruta para obtener todos los resultados (con validaciones de rol y esquema de consulta)
router.get("/",
  passport.authenticate('jwt', {session: false}), // Autenticación con JWT
  checkRoles('ADMIN', 'ANALISTA'), // Verificación de roles permitidos
  validatorHandler(queryResultadoSchema, 'query'), // Validación del query string
  async (req, res,next) =>{
    try {
      const resultados = await service.find(req.query); // Buscar resultados con el query string
      res.json(resultados); // Responder con los resultados encontrados
    } catch (error) {
      next(error); // Pasar el error al siguiente middleware
    }
});

// Ruta para obtener los resultados de un paciente por su ID
router.get('/list/:idPaciente',
  passport.authenticate('jwt', {session: false}), // Autenticación con JWT
  checkRoles('ADMIN', 'ANALISTA', 'PACIENTE'), // Verificación de roles permitidos
  async (req, res, next) => {
    try {
      const { idPaciente } = req.params;
      const resultado = await service.findByUser(idPaciente); // Buscar resultados por el ID del paciente
      res.json(resultado); // Responder con los resultados encontrados
    } catch (error) {
      next(error); // Pasar el error al siguiente middleware
    }
});

// Ruta para crear un nuevo resultado
router.post('/',
  passport.authenticate('jwt', {session: false}), // Autenticación con JWT
  checkRoles('ADMIN', 'ANALISTA', 'PACIENTE'), // Verificación de roles permitidos
  validatorHandler(createResultadoSchema, 'body'), // Validación del cuerpo de la solicitud
  async (req, res, next) => {
    try {
      const body = req.body;
      const newResultado = await service.create(body); // Crear un nuevo resultado
      const email = authService.sendNewResultado(body.userId); // Enviar notificación por correo electrónico
      res.status(201).json(newResultado); // Responder con el resultado creado
    } catch (error) {
      next(error); // Pasar el error al siguiente middleware
    }
});

// Ruta para obtener la lista de archivos
router.get('/files', async (req, res) => {
  const result = await getFiles(); // Obtener la lista de archivos
  res.json(result.Contents); // Responder con la lista de archivos
});

// Ruta para obtener la URL de un archivo
router.get('/files/:fileName', async (req, res) => {
  const result = await getFileURL(req.params.fileName); // Obtener la URL de un archivo
  res.send({
    url: result // Responder con la URL del archivo
  });
});

// Ruta para descargar un archivo en formato PDF
router.get('/descargarpdf/:fileName', async (req, res) => {
  await downloadFile(req.params.fileName); // Descargar un archivo en formato PDF
  res.json({message: " Descarga exitosa "}); // Responder con un mensaje de éxito
});

// Ruta para cargar un archivo
router.post('/files', async (req, res) => {
  const result = await uploadFile(req.files.file); // Cargar un archivo
  res.json({result}); // Responder con el resultado de la carga del archivo
});

// Ruta para actualizar un resultado
router.patch('/:idResultado',
  passport.authenticate('jwt', {session: false}), // Autenticación con JWT
  checkRoles('ADMIN', 'ANALISTA'), // Verificación de roles permitidos
  validatorHandler(getResultadoSchema, 'params'), // Validación de los parámetros de la solicitud
  validatorHandler(updateResultadoSchema, 'body'), // Validación del cuerpo de la solicitud
  async (req, res, next) => {
    try {
      const { idResultado } = req.params;
      const body = req.body;
      const resultado = await service.update(idResultado, body); // Actualizar un resultado
      res.json(resultado); // Responder con el resultado actualizado
    } catch (error) {
      next(error); // Pasar el error al siguiente middleware
    }
});

// Ruta para eliminar un resultado
router.delete('/:idResultado',
  passport.authenticate('jwt', {session: false}), // Autenticación con JWT
  checkRoles('ADMIN', 'ANALISTA'), // Verificación de roles permitidos
  validatorHandler(getResultadoSchema, 'params'), // Validación de los parámetros de la solicitud
  async (req, res, next) => {
    try {
      console.log('aaaaa')
      const { idResultado } = req.params;
      await service.delete(idResultado); // Eliminar un resultado
      res.status(201).json({idResultado}); // Responder con el ID del resultado eliminado
    } catch (error) {
      next(error); // Pasar el error al siguiente middleware
    }
  }
);

module.exports = router; // Exportar el router para ser utilizado en otros archivos
