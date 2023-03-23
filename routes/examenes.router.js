const express = require("express");

const ExamenesService = require('./../services/examenes.service')

const router = express.Router();
const service =  new ExamenesService();

router.get("/", (req, res) =>{
  const examenes = service.find()
  res.json(examenes);
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const examen = service.findOne(id);
  res.json(examen);
});

router.post('/', (req, res) => {
  const body = req.body;
  res.json({
    message: "Creado",
    data: body
  });
});

router.patch('/:id', (req, res) => {
  const { id } = req.params;
  const body = req.body;
  res.json({
    message: "Actualizado",
    data: body,
    id
  });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  res.json({
    message: "Elminiado",
    id
  });
});

module.exports = router;
