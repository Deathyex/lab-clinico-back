const Joi = require('joi'); // Importa la librería Joi para la validación de datos

const idResultado = Joi.string().uuid(); // Define una validación para el campo "idResultado", que debe ser una cadena UUID.
const name =  Joi.string().min(3).max(255); // Define una validación para el campo "name", que debe ser una cadena de entre 3 y 255 caracteres.
const url =  Joi.string().min(3).max(512); // Define una validación para el campo "url", que debe ser una cadena de entre 3 y 512 caracteres.
const resultadoDate = Joi.date(); // Define una validación para el campo "resultadoDate", que debe ser una fecha.
const userId = Joi.string().alphanum(); // Define una validación para el campo "userId", que debe ser una cadena alfanumérica.
const examenId = Joi.number().integer(); // Define una validación para el campo "examenId", que debe ser un número entero.

const resultadoDate_min = Joi.date(); // Define una validación para el campo "resultadoDate_min", que debe ser una fecha.
const resultadoDate_max = Joi.date(); // Define una validación para el campo "resultadoDate_max", que debe ser una fecha.

const limit = Joi.number().integer(); // Define una validación para el campo "limit", que debe ser un número entero.
const offset = Joi.number().integer(); // Define una validación para el campo "offset", que debe ser un número entero.

const createResultadoSchema = Joi.object({
  resultadoDate: resultadoDate.required(), // Define un esquema de validación para la creación de un resultado. Requiere que "resultadoDate" cumpla con la validación y sea obligatorio.
  userId: userId.required(), // Requiere que "userId" cumpla con la validación y sea obligatorio.
  examenId: examenId.required(), // Requiere que "examenId" cumpla con la validación y sea obligatorio.
  url: url.required() // Requiere que "url" cumpla con la validación y sea obligatorio.
});

const updateResultadoSchema = Joi.object({
  resultadoDate: resultadoDate, // Define un esquema de validación para la actualización de un resultado. "resultadoDate" no es obligatorio y debe cumplir con la validación si se proporciona.
  userId: userId, // "userId" no es obligatorio y debe cumplir con la validación si se proporciona.
  examenId: examenId, // "examenId" no es obligatorio y debe cumplir con la validación si se proporciona.
  url: url // "url" no es obligatorio y debe cumplir con la validación si se proporciona.
});

const getResultadoSchema = Joi.object({
  idResultado: idResultado.required(), // Define un esquema de validación para obtener un resultado por su ID. Requiere que "idResultado" cumpla con la validación y sea obligatorio.
});

const queryResultadoSchema = Joi.object({
  limit, // Define un esquema de validación para las consultas de resultados, incluyendo "limit" y "offset".
  offset,
  name,
  resultadoDate,
  resultadoDate_min,
  resultadoDate_max: resultadoDate_max.when('resultadoDate_min', {
    is: Joi.date().required(),
    then: Joi.required() // Si "resultadoDate_min" es proporcionado, "resultadoDate_max" se vuelve obligatorio.
  })
});

module.exports = { createResultadoSchema, updateResultadoSchema, getResultadoSchema, queryResultadoSchema } // Exporta los esquemas de validación para ser utilizados en otros archivos.
