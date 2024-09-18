const boom = require('@hapi/boom');

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

module.exports = { checkRoles };
