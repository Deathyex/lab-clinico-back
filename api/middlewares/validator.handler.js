const boom = require('@hapi/boom');

// Middleware para la validación de datos
function validatorHandler(schema, property) {
  return (req, res, next) => {
    const data = req[property]; // Obtiene los datos de la propiedad especificada (por ejemplo, req.body o req.params)
    const { error } = schema.validate(data, { abortEarly: false }); // Valida los datos utilizando el esquema proporcionado
    if (error) {
      next(boom.badRequest(error)); // Si hay errores de validación, responde con un error 400 Bad Request usando boom
    }
    next(); // Si la validación es exitosa, pasa al siguiente middleware o controlador
  }
}

module.exports = validatorHandler;