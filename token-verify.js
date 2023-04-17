const jwt = require('jsonwebtoken');

const secret = 'mySecret';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInJvbGUiOiJwYWNpZW50ZSIsImlhdCI6MTY4MTc2NTY3NH0.ZBCfdWd5m8O7TJa3BYvzqWqOLg9s_J28cER1B4L3viA';

function verifyToken(token, secret) {
  return jwt.verify(token, secret);
}

const payload = verifyToken(token, secret);
console.log(payload);
