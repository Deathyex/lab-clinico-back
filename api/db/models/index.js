const { User, UserSchema } = require('./user.model');
// importan todos los modelos

function setupModels(sequelize) {
  User.init(UserSchema, User.config(sequelize));
  // ingresa todos los eschema
}

module.exports =  setupModels;
