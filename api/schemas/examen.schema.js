const Joi = require('joi'); // Importa la librería Joi para la validación de datos

const id = Joi.string().uuid(); // Define una validación para el campo "id", que debe ser una cadena UUID
const name = Joi.string().min(4); // Define una validación para el campo "name", que debe ser una cadena de al menos 4 caracteres
const description = Joi.string().min(8); // Define una validación para el campo "description", que debe ser una cadena de al menos 8 caracteres

const createExamenSchema = Joi.object({
	id: id, // "id" no es obligatorio y debe cumplir con la validación si se proporciona.
	name: name.required(), // Requiere que "name" cumpla con la validación y sea obligatorio.
	description: description.required() // Requiere que "description" cumpla con la validación y sea obligatorio.
});

const updateExamenSchema = Joi.object({
	description: description, // Define un esquema de validación para la actualización de un examen. "description" no es obligatorio y debe cumplir con la validación si se proporciona.
	id: id, // "id" no es obligatorio y debe cumplir con la validación si se proporciona.
	name: name // "name" no es obligatorio y debe cumplir con la validación si se proporciona.
});

const getExamenSchema = Joi.object({
	id: id.required() // Define un esquema de validación para obtener un examen por su ID. Requiere que "id" cumpla con la validación y sea obligatorio.
});

module.exports = { createExamenSchema, updateExamenSchema, getExamenSchema }; // Exporta los esquemas de validación para ser utilizados en otros archivos.
