const boom = require('@hapi/boom');

const { config } = require('./../config/config');

// Middleware para verificar la API Key en las cabeceras de la solicitud
function checkApiKey(req, res, next) {
	const apiKey = req.headers['api'];
	if (apiKey === config.apiKey) {
		next();
	} else {
		next(boom.unauthorized());
	}
}

// Middleware para verificar si el usuario tiene rol de administrador
function checkAdminRole(req, res, next) {
	const user = req.user;
	if (user.role == 'ADMIN') {
		next();
	} else {
		next(
			boom.forbidden(
				'No tiene los permisos suficientes para ejecutar esta acción'
			)
		);
	}
}

// Middleware para verificar si el usuario tiene uno de los roles especificados
function checkRoles(...roles) {
	return (req, res, next) => {
		const user = req.user;
		console.log(roles);
		console.log(user.role);
		if (roles.includes(user.role)) {
			next();
		} else {
			next(
				boom.forbidden(
					'No tiene los permisos suficientes para ejecutar esta acción'
				)
			);
		}
	};
}

module.exports = { checkApiKey, checkAdminRole, checkRoles };
