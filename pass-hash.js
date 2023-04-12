const bcrypt = require('bcrypt');

async function hashPassword(){
  const myPassword = 'admin_123dsdS12';
  const hash = await bcrypt.hash(myPassword, 777);
  console.log(hash);
}

hashPassword();
