const express = require("express");

const ExamenesService = require('./../services/examenes.service');
const validatorHandler = require('./../middlewares/validator.handler');
const { createExamenSchema, updateExamenSchema, getExamenSchema } = require('./../schemas/examen.schema');


const router = express.Router();
const service =  new ExamenesService();

router.get("/", async (req, res,next) =>{
  try {
    const examenes = await service.find();
    res.json(examenes);
  } catch (error) {
    next(error);
  }
});

router.get('/:idExamen',
  validatorHandler(getExamenSchema, 'params'),
  async (req, res, next) => {
    try {
      const { idExamen } = req.params;
      const examen = await service.findOne(idExamen);
      res.json(examen);
    } catch (error) {
      next(error);
    }
});

router.post('/',
  validatorHandler(createExamenSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newExamen = await service.create(body);
      res.status(201).json(newExamen);
    } catch (error) {
      next(error);
    }
});

router.patch('/:idExamen',
  validatorHandler(getExamenSchema, 'params'),
  validatorHandler(updateExamenSchema, 'body'),
  async (req, res, next) => {
    try {
      const { idExamen } = req.params;
      const body = req.body;
      const examen = await service.update(idExamen, body);
      res.json(examen);
    } catch (error) {
      next(error);
    }
});

router.delete('/:idExamen',
  validatorHandler(getExamenSchema, 'params'),
  async (req, res, next) => {
    try {
      console.log('aaaaa')
      const { idExamen } = req.params;
      await service.delete(idExamen);
      res.status(201).json({idExamen});
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
