// Importaciones de módulos y configuraciones
const express = require('express'); // Express para construir rutas
const passport = require('passport'); // Passport para autenticación
const jwt = require('jsonwebtoken'); // JWT para generar tokens

const AuthService = require('../services/auth.service'); // Servicio de autenticación

const router = express.Router(); // Creación del router
const authService = new AuthService(); // Instancia del servicio de autenticación

// Ruta de inicio de sesión
router.post('/login',
  passport.authenticate('local', {session: false}),
  async (req, res, next) => {
    try {
      const user = req.user;
      res.json(authService.signToken(user)); // Responder con un token JWT
    } catch (error) {
      next(error); // Pasar el error al siguiente middleware
    }
  }
);

// Ruta de recuperación de contraseña
router.post('/recuperacion',
  async (req, res, next) => {
    try {
      const { email } = req.body;
      const rta = await authService.sendResetPassword(email);
      res.json(rta); // Responder con la respuesta del servicio
    } catch (error) {
      next(error); // Pasar el error al siguiente middleware
    }
  }
);

// Ruta de actualización de contraseña
router.post('/actualizacion-contra',
  async (req, res, next) => {
    try {
      const { token, newPassword } = req.body;
      const rta = await authService.changePassword(token, newPassword);
      res.json(rta); // Responder con la respuesta del servicio
    } catch (error) {
      next(error); // Pasar el error al siguiente middleware
    }
  }
);

module.exports = router; // Exportar el router para ser utilizado en otros archivos
