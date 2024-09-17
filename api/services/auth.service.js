const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sendMail = require('../mailer/nodemailer');

// Importa la configuración desde el archivo correspondiente
const { config } = require('../config/config');

// Importa el servicio de usuario
const UserService = require('./user.service');
const userService = new UserService();

class AuthService {
	// Método para obtener un usuario por email y contraseña
	async login(email, userInputPassword) {
		const user = await userService.findUserByEmail(email);

		// Si el usuario no existe, lanza un error de no autorizado
		if (!user) {
			throw boom.unauthorized();
		}

		// Compara la contraseña proporcionada con la almacenada en la base de datos
		const isMatch = await bcrypt.compare(userInputPassword, user.password);

		// Si no hay coincidencia, lanza un error de no autorizado
		if (!isMatch) {
			throw boom.unauthorized();
		}

		// Elimina la contraseña del objeto de usuario antes de devolverlo
		delete user.dataValues.password;
		return user;
	}

	// Método para firmar un token JWT
	signToken(user) {
		const payload = {
			sub: user.id,
			role: user.role
		};

		const token = jwt.sign(payload, config.jwtsecret);

		return {
			user,
			token
		};
	}

	// Método para enviar un correo de recuperación de contraseña
	async sendResetPassword(email) {
		const user = await userService.findUserByEmail(email);

		// Si el usuario no existe, lanza un error de no autorizado
		if (!user) {
			throw boom.unauthorized();
		}

		// Genera un token de recuperación de contraseña que caduca en 15 minutos
		const payload = {
			sub: user.id
		};
		const token = jwt.sign(payload, config.jwtsecret, { expiresIn: '15min' });
		const link = `http://myfrontend.com/recuperar?token=${token}`;

		// Actualiza el campo de recuperación de token en la base de datos
		await userService.updateUser(user.id, { recoveryToken: token });

		const rta = await sendMail(user, 'recovery', link);
		return rta;
	}

	// Método para cambiar la contraseña
	async changePassword(token, newPassword) {
		try {
			// Verifica el token
			const payload = jwt.verify(token, config.jwtsecret);

			// Encuentra al usuario asociado al token
			const user = await userService.findUserById(payload.sub);

			// Si el token de recuperación no coincide, lanza un error de no autorizado
			if (user.recoveryToken !== token) {
				throw boom.unauthorized();
			}

			// Encripta la nueva contraseña y actualiza en la base de datos
			const hashedPassword = await bcrypt.hash(newPassword, 10);
			await userService.updateUser(user.id, {
				recoveryToken: null,
				password: hashedPassword
			});

			return { message: 'contraseña actualizada' };
		} catch (error) {
			throw boom.unauthorized();
		}
	}
}

// Exporta la clase AuthService
module.exports = AuthService;
