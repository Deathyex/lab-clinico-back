const Joi = require('joi');

const idExamen = Joi.string().uuid();
const name =  Joi.string().min(3).max(255);
const examenDate = Joi.date();
const idPaciente= Joi.string().alphanum();

const createExamenSchema = Joi.object({
  name: name.required(),
  examenDate: examenDate.required(),
  idPaciente: idPaciente.required()
});

const updateExamenSchema = Joi.object({
  idExamen: idExamen,
  name: name,
  examenDate: examenDate,
  idPaciente: idPaciente
});

const getExamenSchema = Joi.object({
  idExamen: idExamen.required(),
});

module.exports = { createExamenSchema, updateExamenSchema, getExamenSchema }
