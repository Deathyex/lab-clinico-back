const { User, UserSchema } = require('./user.model');
const { Examen, ExamenSchema } = require('.//examen.model');
// importan todos los modelos

function setupModels(sequelize) {
  User.init(UserSchema, User.config(sequelize));
  Examen.init(ExamenSchema, Examen.config(sequelize));


  Examen.asssociate(sequelize.models);
  User.asssociate(sequelize.models);
}

module.exports =  setupModels;
