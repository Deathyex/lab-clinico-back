const boom = require('@hapi/boom');

const { models } = require('../libs/sequelize');

class ResultadosService{
  constructor(){}

  async create(data){
    const newResultado = await models.Resultado.create(data);
    return newResultado;
    }

  async find(query){
    const options = {
      include: ['examen'],
    }
    const { limit, offset } = query;
    if (limit && offset ) {
      options.limit = limit;
      options.offset = offset;
    }
    const rta = await models.Resultado.findAll(options);
    return rta;
  }

  async findOne(idResultado){
    const resultado =  await models.Resultado.findByPk(idResultado, {
      include: ['examen','user']
    });
    if(!resultado){
      throw boom.notFound('Resultado no encontrado');
    }
    if(resultado.isBlock){
      throw boom.conflict('Resultado con acceso restringido');
    }
    return resultado;
  }

  async update(idResultado, changes){
    const resultado = await this.findOne(idResultado);
    const rta = await resultado.update(changes);
    return rta;
  }

  async delete(idResultado){
    const resultado = await models.Resultado.findByPk(idResultado);
    await resultado.destroy();
    return { idResultado };
  }

}

module.exports = ResultadosService;
