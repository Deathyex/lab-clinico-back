const Joi = require('joi'); // Importa la librería Joi para la validación de datos

const id = Joi.number().integer(); // Define una validación para el campo "id", que debe ser un número entero
const name = Joi.string().min(4); // Define una validación para el campo "name", que debe ser una cadena de al menos 4 caracteres
const function_description = Joi.string().min(8); // Define una validación para el campo "function_description", que debe ser una cadena de al menos 8 caracteres

const createExamenSchema = Joi.object({
	id: id.required(), // Define un esquema de validación para la creación de un examen. Requiere que "id" cumpla con la validación y sea obligatorio.
	name: name.required(), // Requiere que "name" cumpla con la validación y sea obligatorio.
	function_description: function_description.required() // Requiere que "function_description" cumpla con la validación y sea obligatorio.
});

const updateExamenSchema = Joi.object({
	function_description: function_description, // Define un esquema de validación para la actualización de un examen. "function_description" no es obligatorio y debe cumplir con la validación si se proporciona.
	id: id, // "id" no es obligatorio y debe cumplir con la validación si se proporciona.
	name: name // "name" no es obligatorio y debe cumplir con la validación si se proporciona.
});

const getExamenSchema = Joi.object({
	id: id.required() // Define un esquema de validación para obtener un examen por su ID. Requiere que "id" cumpla con la validación y sea obligatorio.
});

module.exports = { createExamenSchema, updateExamenSchema, getExamenSchema }; // Exporta los esquemas de validación para ser utilizados en otros archivos.
