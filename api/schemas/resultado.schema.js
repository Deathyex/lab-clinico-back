const Joi = require('joi');

const idResultado = Joi.string().uuid();
const name =  Joi.string().min(3).max(255);
const resultadoDate = Joi.date();
const userId= Joi.string().alphanum();
const examenId= Joi.number().integer();

const limit = Joi.number().integer();
const offset = Joi.number().integer();


const createResultadoSchema = Joi.object({
  name: name.required(),
  resultadoDate: resultadoDate.required(),
  userId: userId.required(),
  examenId: examenId.required()
});

const updateResultadoSchema = Joi.object({
  name: name,
  resultadoDate: resultadoDate,
  userId: userId,
  examenId: examenId
});

const getResultadoSchema = Joi.object({
  idResultado: idResultado.required(),
});

const queryResultadoSchema = Joi.object({
  limit,
  offset
});

module.exports = { createResultadoSchema, updateResultadoSchema, getResultadoSchema, queryResultadoSchema }
