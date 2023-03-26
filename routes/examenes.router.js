const express = require("express");

const ExamenesService = require('./../services/examenes.service')

const router = express.Router();
const service =  new ExamenesService();

router.get("/", async (req, res) =>{
  const examenes = await service.find()
  res.json(examenes);
});

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const examen = await service.findOne(id);
    res.json(examen);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res) => {
  const body = req.body;
  const newExamen = await service.create(body);
  res.status(201).json(newExamen);
});

router.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const examen = await service.update(id, body);
    res.json(examen);
  } catch (error) {
    res.status(404).json({
      message: error.message
    });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const respuesta = await service.delete(id);
  res.json(respuesta);
});

module.exports = router;
