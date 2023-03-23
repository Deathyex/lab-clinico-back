const express = require("express");
const { faker } = require("@faker-js/faker");
const randomName = faker.name.fullName();

const router = express.Router();

router.get("/", (req, res) =>{
  const examenes = []
  const { size } = req.query;
  const limit = size || 10;
  for (let index = 0; index < 100; index++) {
    examenes.push({
      name: faker.commerce.product(),
      price: parseInt(faker.commerce.price(), 10),
      image: faker.image.imageUrl()
    })
  }
  res.json(examenes);
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  res.json({
    id,
    name: "Glucosa en orina",
    price: 1000
  });
});

module.exports = router;
