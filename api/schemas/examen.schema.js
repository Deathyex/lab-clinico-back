const Joi = require('joi');

const id= Joi.number().integer();
const name = Joi.string().min(4);
const function_description = Joi.string().min(8);

const createExamenSchema = Joi.object({
  id: id.required(),
  name: name.required(),
  function_description: function_description.required()
});

const updateExamenSchema = Joi.object({
  function_description: function_description,
  id: id,
  name: name,
});

const getExamenSchema = Joi.object({
  id: id.required(),
});

module.exports = { createExamenSchema, updateExamenSchema, getExamenSchema }
