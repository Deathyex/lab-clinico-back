const Joi = require('joi'); // Importa la librería Joi para la validación de datos
const passwordComplexity = require('joi-password-complexity'); // Importa la librería para validar la complejidad de la contraseña

const complexityOptions = {
	min: 8, // Longitud mínima de la contraseña
	max: 250, // Longitud máxima de la contraseña
	lowerCase: 1, // Requiere al menos 1 letra minúscula
	upperCase: 1, // Requiere al menos 1 letra mayúscula
	numeric: 1, // Requiere al menos 1 número
	symbol: 1, // Requiere al menos 1 carácter especial
	requirementCount: 4 // Número total de requisitos que debe cumplir la contraseña
};

const email = Joi.string().email(); // Define una validación para el campo "email", que debe ser una dirección de correo electrónico válida.
const id = Joi.string().alphanum(); // Define una validación para el campo "id", que debe ser una cadena alfanumérica.
const firstName = Joi.string().min(3); // Define una validación para el campo "firstName", que debe ser una cadena de al menos 8 caracteres.
const lastName = Joi.string().min(3); // Define una validación para el campo "lastName", que debe ser una cadena de al menos 8 caracteres.
const birthDate = Joi.date(); // Define una validación para el campo "birthDate", que debe ser una fecha.
const password = passwordComplexity(complexityOptions); // Define una validación para el campo "password", utilizando las opciones de complejidad.
const role = Joi.string().min(5); // Define una validación para el campo "role", que debe ser una cadena de al menos 5 caracteres.

const createUserSchema = Joi.object({
	id: id.required(), // Define un esquema de validación para la creación de un usuario. Requiere que "id" cumpla con la validación y sea obligatorio.
	firstName: firstName.required(), // Requiere que "firstName" cumpla con la validación y sea obligatorio.
	lastName: lastName.required(), // Requiere que "lastName" cumpla con la validación y sea obligatorio.
	email: email.required(), // Requiere que "email" cumpla con la validación y sea obligatorio.
	birthDate: birthDate.required(), // Requiere que "birthDate" cumpla con la validación y sea obligatorio.
	password: password.required(), // Requiere que "password" cumpla con la validación y sea obligatorio.
	role: role // "role" no es obligatorio, pero debe cumplir con la validación si se proporciona.
});

const updateUserSchema = Joi.object({
	email: email, // Define un esquema de validación para la actualización de un usuario. "email" no es obligatorio y debe cumplir con la validación si se proporciona.
	id: id, // "id" no es obligatorio y debe cumplir con la validación si se proporciona.
	firstName: firstName, // "firstName" no es obligatorio y debe cumplir con la validación si se proporciona.
	lastName: lastName, // "lastName" no es obligatorio y debe cumplir con la validación si se proporciona.
	email: email, // "email" no es obligatorio y debe cumplir con la validación si se proporciona.
	birthDate: birthDate, // "birthDate" no es obligatorio y debe cumplir con la validación si se proporciona.
	role: role // "role" no es obligatorio, pero debe cumplir con la validación si se proporciona.
});

const getUserSchema = Joi.object({
	id: id.required() // Define un esquema de validación para obtener un usuario por su ID. Requiere que "id" cumpla con la validación y sea obligatorio.
});

module.exports = { createUserSchema, updateUserSchema, getUserSchema }; // Exporta los esquemas de validación para ser utilizados en otros archivos.
