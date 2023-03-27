const express = require("express");

const ExamenesService = require('./../services/examenes.service');
const validatorHandler = require('./../middlewares/validator.handler');
const { createExamenSchema, updateExamenSchema, getExamenSchema } = require('./..//schemas/examen.schema');


const router = express.Router();
const service =  new ExamenesService();

router.get("/", async (req, res) =>{
  const examenes = await service.find()
  res.json(examenes);
});

router.get('/:id',
  validatorHandler(getExamenSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const examen = await service.findOne(id);
      res.json(examen);
    } catch (error) {
      next(error);
    }
});

router.post('/',
  validatorHandler(createExamenSchema, 'body'),
  async (req, res) => {
    const body = req.body;
    const newExamen = await service.create(body);
    res.status(201).json(newExamen);
});

router.patch('/:id',
  validatorHandler(getExamenSchema, 'params'),
  validatorHandler(updateExamenSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const examen = await service.update(id, body);
      res.json(examen);
    } catch (error) {
      next(error);
    }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const respuesta = await service.delete(id);
  res.json(respuesta);
});

module.exports = router;
