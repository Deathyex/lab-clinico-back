const Joi = require('joi');

const idResultado = Joi.string().uuid();
const name =  Joi.string().min(3).max(255);
const url =  Joi.string().min(3);
const resultadoDate = Joi.date();
const userId= Joi.string().alphanum();
const examenId= Joi.number().integer();

const resultadoDate_min = Joi.date();
const resultadoDate_max = Joi.date();

const limit = Joi.number().integer();
const offset = Joi.number().integer();


const createResultadoSchema = Joi.object({
  resultadoDate: resultadoDate.required(),
  userId: userId.required(),
  examenId: examenId.required(),
  url: url.required()
});

const updateResultadoSchema = Joi.object({
  resultadoDate: resultadoDate,
  userId: userId,
  examenId: examenId,
  url: url
});

const getResultadoSchema = Joi.object({
  idResultado: idResultado.required(),
});

const queryResultadoSchema = Joi.object({
  limit,
  offset,
  name,
  resultadoDate,
  resultadoDate_min,
  resultadoDate_max: resultadoDate_max.when('resultadoDate_min', {
    is: Joi.date().required(),
    then: Joi.required()
  })
});

module.exports = { createResultadoSchema, updateResultadoSchema, getResultadoSchema, queryResultadoSchema }
