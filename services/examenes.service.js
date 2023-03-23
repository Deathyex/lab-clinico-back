const { faker } = require("@faker-js/faker");
const randomName = faker.name.fullName();

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
        image: faker.image.imageUrl()
      });
    }
  }

  create(){


  }

  find(){
    return this.examenes;
  }

  findOne(){
    return this.examenes.find(item => item.id === id);
  }

  update(){


  }

  delete(){


  }

}

module.exports = ExamenesService;
