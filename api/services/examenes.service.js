const { faker } = require("@faker-js/faker");
const randomName = faker.name.fullName();
const boom = require('@hapi/boom');

class ExamenesService{

  constructor(){
    this.examenes = [];
    this.generate();
  }

  generate(){
    const limit = 100;
    for (let index = 0; index < 100; index++) {
      this.examenes.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.product(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.imageUrl(),
        isBlock: faker.datatype.boolean()
      });
    }
  }

  async create(data){
    const newExamen = {
      id: faker.datatype.uuid(),
      ...data
    }
    this.examenes.push(newExamen);
    return newExamen;
  }

  find(){
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.examenes);
      }, 5000);
    })
  }

  async findOne(id){
    const examen =  this.examenes.find(item => item.id === id);
    if(!examen){
      throw boom.notFound('Examen no encontrado');
    }
    if(examen.isBlock){
      throw boom.conflict('Examen no permitido');
    }
    return examen;
  }

  async update(id, changes){
    const index = this.examenes.findIndex(item => item.id === id);
    if ( index === -1 ){
      throw boom.notFound('Examen no encontrado');
    }
    const examen = this.examenes[index];
    this.examenes[index] = {
      ...examen,
      ...changes
    };
    return this.examenes[index];
  }

  async delete(id){
    const index = this.examenes.findIndex(item => item.id === id);
    if ( index === -1 ){
      throw boom.notFound('Examen no encontrado');
    }
    this.examenes.splice(index, 1);
    return { id };
  }

}

module.exports = ExamenesService;
