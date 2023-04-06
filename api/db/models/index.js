const { User, UserSchema } = require('./user.model');
const { Resultado, ResultadoSchema } = require('./resultado.model');
const { Examen, ExamenSchema } = require('./examen.model');
// importan todos los modelos

function setupModels(sequelize) {
  User.init(UserSchema, User.config(sequelize));
  Resultado.init(ResultadoSchema, Resultado.config(sequelize));
  Examen.init(ExamenSchema, Examen.config(sequelize));

  Examen.asssociate(sequelize.models);
  Resultado.asssociate(sequelize.models);
  User.asssociate(sequelize.models);
}

module.exports =  setupModels;
