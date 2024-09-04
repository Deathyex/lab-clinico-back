const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');

// Importa los modelos de la base de datos
const { models } = require('./../libs/sequelize');

class UserService {
	constructor() {}

	// Método para crear un nuevo usuario
	async create(data) {
		// Hashea la contraseña antes de almacenarla
		const hash = await bcrypt.hash(data.password, 777);

		// Crea un nuevo usuario en la base de datos
		const newUser = await models.User.create({
			...data,
			password: hash
		});

		// Elimina la contraseña del objeto de respuesta
		delete newUser.dataValues.password;

		return newUser;
	}

	// Método para obtener todos los usuarios
	async find() {
		const rta = await models.User.findAll({
			include: ['resultado']
		});
		return rta;
	}

	// Método para encontrar un usuario por su dirección de correo electrónico
	async findByEmail(email) {
		const rta = await models.User.findOne({
			where: { email }
		});
		return rta;
	}

	// Método para encontrar un usuario por su ID
	async findOne(id) {
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
	async update(id, changes) {
		const user = await this.findOne(id);
		const rta = await user.update(changes);
		return rta;
	}

	// Método para eliminar un usuario
	async delete(id) {
		const user = await models.User.findByPk(id);
		await user.destroy();
		return { id };
	}
}

module.exports = UserService;
