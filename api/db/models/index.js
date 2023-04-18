const { User, UserSchema } = require('./user.model');
const { Resultado, ResultadoSchema } = require('./resultado.model');
const { Examen, ExamenSchema } = require('./examen.model');
// importan todos los modelos

function setupModels(sequelize) {
  // Init
  User.init(UserSchema, User.config(sequelize));
  Examen.init(ExamenSchema, Examen.config(sequelize));
  Resultado.init(ResultadoSchema, Resultado.config(sequelize));

  // Esta función se registra con el método beforeValidate de Sequelize para que se ejecute antes de la validación del modelo
  User.beforeValidate((user, opciones) => {
    // Esta línea toma el valor de user.name y lo convierte a mayúsculas
    user.name = user.name.toUpperCase();
    user.role = user.role.toUpperCase();
  });

  // Esta función se registra con el método beforeValidate de Sequelize para que se ejecute antes de la validación del modelo
  Examen.beforeValidate((examen, opciones) => {
    // Esta línea toma el valor de examen.name y lo convierte a minuscula
    examen.name = examen.name.toUpperCase();
  });

  Examen.afterUpdate(async (examenActualizado, opciones) => {
    // Buscar todos los registros en Resultado que correspondan al examen actualizado
    const resultados = await Resultado.findAll({ where: { examenId: examenActualizado.id } });

    // Actualizar la columna name en cada uno de los registros encontrados
    await Promise.all(resultados.map(async (resultado) => {
      resultado.name = examenActualizado.name + '-' + resultado.getUser().name + resultado.resultadoDate;
      await resultado.save();
    }));
  });

  User.afterUpdate(async (userActualizado, opciones) => {
    // Buscar todos los registros en Resultado que correspondan al user actualizado
    const resultados = await Resultado.findAll({ where: { userId: userActualizado.id } });

    // Actualizar la columna name en cada uno de los registros encontrados
    await Promise.all(resultados.map(async (resultado) => {
      resultado.name = userActualizado.name + '-' + resultado.getUser().name + resultado.resultadoDate;
      await resultado.save();
    }));
  });

  // Esta función se ejecuta antes de validar los datos de la instancia del modelo Resultado
  Resultado.beforeValidate(async (instancia, opciones) => {
    // Si la columna "name" está vacía
    if (!instancia.name) {
      // Busca el registro asociado en la tabla Examen y User y los guarda en las variables "Examen" y "User"
      const Examen = await instancia.getExamen();
      const User = await instancia.getUser();
      // Asigna un valor a la columna "name" de la instancia concatenando los valores de la columna "name" de Examen, User y la columna "resultadoDate" de Resultado
      instancia.name = Examen.name + ' - ' + User.name + ' - ' + instancia.resultadoDate;
    }
  });

  // Esta función se ejecuta antes de actualizar un registro en la tabla Resultado
  Resultado.beforeUpdate(async (instancia, opciones) => {
    // Obtenemos la instancia del examen asociado al resultado
    const Examen = await instancia.getExamen();

    // Obtenemos la instancia del usuario asociado al resultado
    const User = await instancia.getUser();

    // Creamos el nuevo valor de la columna "name" concatenando el nombre del examen,
    // el nombre del usuario y la fecha del resultado
    instancia.name = Examen.name + ' - ' + User.name + ' - ' + instancia.resultadoDate;
  });

  // Función que se ejecuta antes de guardar los datos de un registro en la tabla Resultado
  Resultado.beforeSave(async (instancia, opciones) => {
    const User = await instancia.getUser();
    // Si el valor de la columna examenId ha cambiado
    if (instancia.changed('examenId')) {
      // Obtener el registro del examen correspondiente al examenId
      const Examen = await instancia.getExamen();
      // Actualizar el valor de la columna name concatenando el nombre del examen y la fecha del resultado
      instancia.name = Examen.name + ' - ' + User.name + ' - ' + instancia.resultadoDate;
    }
    // Si el valor de la columna resultadoDate ha cambiado
    else if (instancia.changed('resultadoDate')) {
      // Obtener el registro del examen correspondiente al examenId
      const Examen = await instancia.getExamen();
      // Actualizar el valor de la columna name concatenando el nombre del examen y la fecha del resultado
      instancia.name = Examen.name + ' - ' + User.name + ' - ' + instancia.resultadoDate;
    }
  });

  // Associate
  Examen.asssociate(sequelize.models);
  Resultado.asssociate(sequelize.models);
  User.asssociate(sequelize.models);
}

module.exports =  setupModels;
