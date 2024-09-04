// Middleware para registrar errores en la consola
function logErrors(err, req, res, next) {
	console.log('logErrors');
	console.error(err);
	next(err); // Llama al siguiente middleware o controlador de errores
}

// Middleware para manejar errores y responder con un mensaje detallado
function errorHandler(err, req, res, next) {
	console.log('errorHandler');
	res.status(500).json({
		message: err.message,
		stack: err.stack
	});
}

// Middleware para manejar errores de Boom (errores HTTP)
function boomErrorHandler(err, req, res, next) {
	if (err.isBoom) {
		const { output } = err; // Obtiene los detalles del error Boom
		res.status(output.statusCode).json(output.payload); // Responde con el código de estado y el mensaje del error Boom
	} else {
		next(err); // Si no es un error Boom, pasa al siguiente middleware o controlador de errores
	}
}

module.exports = { logErrors, errorHandler, boomErrorHandler };
