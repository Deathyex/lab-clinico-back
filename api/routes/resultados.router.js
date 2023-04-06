const express = require("express");

const ResultadosService = require('./../services/resultados.service');
const validatorHandler = require('../middlewares/validator.handler');
const { createResultadoSchema, updateResultadoSchema, getResultadoSchema, queryResultadoSchema } = require('./../schemas/resultado.schema');


const router = express.Router();
const service =  new ResultadosService();

router.get("/",
validatorHandler(queryResultadoSchema, 'query'),
  async (req, res,next) =>{
  try {
    const resultados = await service.find(req.query);
    res.json(resultados);
  } catch (error) {
    next(error);
  }
});

router.get('/:idResultado',
  validatorHandler(getResultadoSchema, 'params'),
  async (req, res, next) => {
    try {
      const { idResultado } = req.params;
      const resultado = await service.findOne(idResultado);
      res.json(resultado);
    } catch (error) {
      next(error);
    }
});

router.post('/',
  validatorHandler(createResultadoSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newResultado = await service.create(body);
      res.status(201).json(newResultado);
    } catch (error) {
      next(error);
    }
});

router.patch('/:idResultado',
  validatorHandler(getResultadoSchema, 'params'),
  validatorHandler(updateResultadoSchema, 'body'),
  async (req, res, next) => {
    try {
      const { idResultado } = req.params;
      const body = req.body;
      const resultado = await service.update(idResultado, body);
      res.json(resultado);
    } catch (error) {
      next(error);
    }
});

router.delete('/:idResultado',
  validatorHandler(getResultadoSchema, 'params'),
  async (req, res, next) => {
    try {
      console.log('aaaaa')
      const { idResultado } = req.params;
      await service.delete(idResultado);
      res.status(201).json({idResultado});
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
