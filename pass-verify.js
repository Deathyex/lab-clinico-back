const bcrypt = require('bcrypt');

async function hashPassword(){
  const myPassword = 'admin_123dsdS12';
  const hash = '$2b$09$p757fpA4RpqszUTobq3tru9C9Gm1l61DLj7./AfDYM.1YY1MYzvZG';
  const isMatch = await bcrypt.compare(myPassword, hash);
  console.log(isMatch);
}

hashPassword();
