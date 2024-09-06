const express = require('express');

const AuthService = require('../services/auth.service'); // Servicio de autenticación
const UserService = require('./../services/user.service'); // Importa el servicio de usuarios
const validatorHandler = require('./../middlewares/validator.handler'); // Importa el manejador de validaciones
const {
	updateUserSchema,
	createUserSchema,
	getUserSchema
} = require('./../schemas/user.schema'); // Importa los esquemas de validación

const router = express.Router(); // Crea un nuevo enrutador
const userService = new UserService(); // Crea una nueva instancia del servicio de usuarios
const authService = new AuthService(); // Instancia del servicio de autenticación

// Ruta para obtener todos los usuarios
router.get('/listAll', async (req, res, next) => {
	try {
		const users = await userService.findAllUsers(); // Obtiene todos los usuarios desde el servicio
		res.json(users); // Responde con la lista de usuarios
	} catch (error) {
		next(error); // Pasa el error al siguiente middleware
	}
});

// Ruta para obtener un usuario por su ID
router.get(
	'/list/:id',
	validatorHandler(getUserSchema, 'params'), // Valida el ID del usuario
	async (req, res, next) => {
		try {
			const { id } = req.params;
			const user = await userService.findUserById(id); // Obtiene un usuario por su ID desde el servicio
			res.json(user); // Responde con el usuario encontrado
		} catch (error) {
			next(error); // Pasa el error al siguiente middleware
		}
	}
);

// Ruta para crear un nuevo usuario
router.post(
	'/create',
	validatorHandler(createUserSchema, 'body'), // Valida los datos del nuevo usuario
	async (req, res, next) => {
		try {
			const body = req.body;
			const newUser = await userService.createUser(body); // Crea un nuevo usuario en el servicio
			res.status(201).json(authService.signToken(newUser)); // Responde con el nuevo usuario, un token y un código 201
		} catch (error) {
			next(error); // Pasa el error al siguiente middleware
		}
	}
);

// Ruta para actualizar un usuario por su ID
router.patch(
	'/update/:id',
	validatorHandler(getUserSchema, 'params'), // Valida el ID del usuario
	validatorHandler(updateUserSchema, 'body'), // Valida los datos actualizados del usuario
	async (req, res, next) => {
		try {
			const { id } = req.params;
			const body = req.body;
			const updatedUser = await userService.updateUser(id, body); // Actualiza un usuario en el servicio
			res.json(updatedUser); // Responde con el usuario actualizado
		} catch (error) {
			next(error); // Pasa el error al siguiente middleware
		}
	}
);

// Ruta para eliminar un usuario por su ID
router.delete(
	'/delete/:id',
	validatorHandler(getUserSchema, 'params'), // Valida el ID del usuario
	async (req, res, next) => {
		try {
			const { id } = req.params;
			await userService.deleteUser(id); // Elimina un usuario en el servicio
			res.status(201).json({ id }); // Responde con el ID del usuario eliminado
		} catch (error) {
			next(error); // Pasa el error al siguiente middleware
		}
	}
);

module.exports = router; // Exporta el enrutador para ser utilizado en otros archivos
