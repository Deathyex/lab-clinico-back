const Joi = require('joi');

const idExamen = Joi.string().uuid();
const name =  Joi.string().min(3).max(255);
const examenDate = Joi.date();
const userId= Joi.string().alphanum();

const createExamenSchema = Joi.object({
  name: name.required(),
  examenDate: examenDate.required(),
  userId: userId.required()
});

const updateExamenSchema = Joi.object({
  name: name,
  examenDate: examenDate,
  userId: userId
});

const getExamenSchema = Joi.object({
  idExamen: idExamen.required(),
});

module.exports = { createExamenSchema, updateExamenSchema, getExamenSchema }
