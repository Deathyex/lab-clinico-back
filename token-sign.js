const jwt = require('jsonwebtoken');

// Definir el secreto para firmar el token
const secret = 'mySecret';

// Definir el contenido del payload
const payload = {
  sub: 1,          // Identificador de sujeto (subject)
  role: 'paciente' // Rol del usuario
}

// Función para firmar un token con el payload y el secreto
function signToken(payload, secret) {
  return jwt.sign(payload, secret);
}

// Generar el token
const token = signToken(payload, secret);

// Imprimir el token en la consola
console.log(token);
