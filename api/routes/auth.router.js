// Importaciones de módulos y configuraciones
const express = require('express'); // Express para construir rutas
const passport = require('passport'); // Passport para autenticación
const passportLocal = require('../strategies/local.strategy'); // Passport para autenticación
const AuthService = require('../services/auth.service'); // Servicio de autenticación

const router = express.Router(); // Creación del router
const authService = new AuthService(); // Instancia del servicio de autenticación

// Ruta de inicio de sesión
router.post(
	'/login',
	passport.authenticate(passportLocal, { session: false }),
	async (req, res, next) => {
		try {
			const user = req.user;
			if (user) {
				res.json(authService.signToken(user)); // Responder con un token JWT
			} else {
				res
					.status(401)
					.json({ status: 'Error', message: 'Los datos son incorrectos' });
			}
		} catch (error) {
			next(error); // Pasar el error al siguiente middleware
		}
	}
);

// Ruta de recuperación de contraseña
router.post('/recuperacion', async (req, res, next) => {
	try {
		const { email } = req.body;
		const respuesta = await authService.sendResetPassword(email);
		res.json(respuesta); // Responder con la respuesta del servicio
	} catch (error) {
		next(error); // Pasar el error al siguiente middleware
	}
});

// Ruta de actualización de contraseña
router.post('/changepassword', async (req, res, next) => {
	try {
		const { token, newPassword } = req.body;
		const rta = await authService.changePassword(token, newPassword);
		res.json(rta); // Responder con la respuesta del servicio
	} catch (error) {
		next(error); // Pasar el error al siguiente middleware
	}
});

module.exports = router; // Exportar el router para ser utilizado en otros archivos
