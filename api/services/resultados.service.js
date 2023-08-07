const boom = require('@hapi/boom');
const fileUpload = require('express-fileupload');

const { models } = require('../libs/sequelize');
const { Op } = require("sequelize");

class ResultadosService{
  constructor(){}

  // Crear resultados
  async create(data){
    const newResultado = await models.Resultado.create(data);
    return newResultado;
    }

  // Obtener resultados
  async find(query){
    const options = {
      include: ['examen'],
      where: {}
    }
    // Paginacion
    const { limit, offset } = query;
    if (limit && offset ) {
      options.limit = limit;
      options.offset = offset;
    }
    // filtrar por nombre
    const { name } = query;
    if (name) {
      options.where.name = {
        [Op.substring]: name
      };
    }
    // filtrar por fecha especifica
    const { resultadoDate } = query;
    if (resultadoDate) {
      options.where.resultadoDate = resultadoDate;
    }
    // filtrar por rango de fecha
    const { resultadoDate_min, resultadoDate_max } = query;
    if (resultadoDate_min && resultadoDate_max) {
      options.where.resultadoDate = {
        [Op.gte]: resultadoDate_min,
        [Op.lte]: resultadoDate_max
      };
    }
    const rta = await models.Resultado.findAll(options);
    return rta;
  }

  async findByUser(userId) {
    const resultados = await models.Resultado.findAll({
      where: {
        id_paciente: userId
      },
      include: [
        {
          model: models.User,
          as: 'user'
        }
      ]
    });
    return resultados
  }

  // Obtener resultado especifico
  async findOne(idResultado){
    const resultado =  await models.Resultado.findByPk(idResultado, {
      include: ['examen','user']
    });
    // Manejo y captura de error por middlewares
    if(!resultado){
      throw boom.notFound('Resultado no encontrado');
    }
    if(resultado.isBlock){
      throw boom.conflict('Resultado con acceso restringido');
    }
    return resultado;
  }

  // Actualizar resultados
  async update(idResultado, changes){
    const resultado = await this.findOne(idResultado);
    const rta = await resultado.update(changes);
    return rta;
  }

  // Eliminar resultados
  async delete(idResultado){
    const resultado = await models.Resultado.findByPk(idResultado);
    await resultado.destroy();
    return { idResultado };
  }

}

module.exports = ResultadosService;
