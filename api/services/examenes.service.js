const boom = require('@hapi/boom');

const { models } = require('./../libs/sequelize');

class ExamenesService{
  constructor(){}

  async create(data){
    const newExamen = await models.Examen.create(data);
    return newExamen;
    }

  async find(){
    const rta = await models.Examen.findAll({
      include: ['user']
    });
    return rta;
  }

  async findOne(idExamen){
    const examen =  await models.Examen.findByPk(idExamen);
    if(!examen){
      throw boom.notFound('Examen no encontrado');
    }
    if(examen.isBlock){
      throw boom.conflict('Examen no permitido');
    }
    return examen;
  }

  async update(idExamen, changes){
    const examen = await this.findOne(idExamen);
    const rta = await examen.update(changes);
    return rta;
  }

  async delete(idExamen){
    console.log("prueba")
    const examen = await models.Examen.findByPk(idExamen);
    console.log("prueba1")
    await examen.destroy();
    return { idExamen };
  }

}

module.exports = ExamenesService;
