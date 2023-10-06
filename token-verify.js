const jwt = require('jsonwebtoken');

// Definir el secreto para verificar el token
const secret = 'mySecret';

// Definir el token JWT
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInJvbGUiOiJwYWNpZW50ZSIsImlhdCI6MTY4MTc2NTY3NH0.ZBCfdWd5m8O7TJa3BYvzqWqOLg9s_J28cER1B4L3viA';

// Función para verificar un token con el secreto
function verifyToken(token, secret) {
  return jwt.verify(token, secret);
}

// Verificar el token y obtener el payload
const payload = verifyToken(token, secret);

// Imprimir el payload en la consola
console.log(payload);
