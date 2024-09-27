const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');

// Importa los modelos de la base de datos
const { models } = require('./../libs/sequelize');

class UserService {
	constructor() {}

	// Método para obtener el primer nombre y apellido del user
	async getShortNameFromId(id) {
		const { firstName, lastName } = await this.findUserById(id);
		const shortName = `${firstName.split(' ')[0]} ${lastName.split(' ')[0]}`;
		return shortName;
	}

	// Método para crear un nuevo usuario
	async createUser(data) {
		// Hashea la contraseña antes de almacenarla
		const hashedPassword = await bcrypt.hash(data.password, 10);

		// Crea un nuevo usuario en la base de datos
		const newUser = await models.User.create({
			...data,
			password: hashedPassword
		});

		// Elimina la contraseña del objeto de respuesta
		delete newUser.dataValues.password;

		return newUser;
	}

	// Método para obtener todos los usuarios
	async findAllUsers() {
		const rta = await models.User.findAll({
			include: ['resultado']
		});
		return rta;
	}

	// Método para encontrar un usuario por su dirección de correo electrónico
	async findUserByEmail(email) {
		const rta = await models.User.findOne({
			where: { email }
		});
		return rta;
	}

	// Método para encontrar un usuario por su ID
	async findUserById(id) {
		const user = await models.User.findByPk(id, {
			include: ['resultado']
		});

		// Si el usuario no se encuentra, lanza un error 404
		if (!user) {
			throw boom.notFound('Usuario no encontrado');
		}

		return user;
	}

	// Método para actualizar un usuario
	async updateUser(id, changes) {
		const user = await this.findOne(id);
		const rta = await user.update(changes);
		return rta;
	}

	// Método para eliminar un usuario
	async deleteUser(id) {
		const user = await models.User.findByPk(id);
		await user.destroy();
		return { id };
	}
}

module.exports = UserService;
