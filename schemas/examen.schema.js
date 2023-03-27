const Joi = require('joi');

const id = Joi.string().uuid;
const name =  Joi.string().alphanum().min(3).max(15);
const price = Joi.number().integer().min(10);


const createExamenSchema = Joi.object({
  name: name.required(),
  price: price.required(),
});

const updateExamenSchema = Joi.object({
  name: name,
  price: price,
});

const getExamenSchema = Joi.object({
  id: id.required()
});

module.exports = { createExamenSchema, updateExamenSchema, getExamenSchema }
