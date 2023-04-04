const Joi = require('joi');
const passwordComplexity = require("joi-password-complexity");

const complexityOptions = {
  min: 8,
  max: 250,
  lowerCase: 1,
  upperCase: 1,
  numeric: 1,
  symbol: 1,
  requirementCount: 4,
};

const email = Joi.string().email();
const id= Joi.string().alphanum();
const name = Joi.string().min(8);
const birthDate = Joi.date();
const password = passwordComplexity(complexityOptions);
const role = Joi.string().min(5);

const createUserSchema = Joi.object({
  id: id.required(),
  name: name.required(),
  email: email.required(),
  birthDate: birthDate.required(),
  password: password.required(),
  role: role
});

const updateUserSchema = Joi.object({
  email: email,
  id: id,
  name: name,
  email: email,
  birthDate: birthDate,
  role: role,
});

const getUserSchema = Joi.object({
  id: id.required(),
});

module.exports = { createUserSchema, updateUserSchema, getUserSchema }
