const express = require("express");
const app = express();
const port = 3777;

app.get("/", (req, res) =>{
  res.send("Hola mi server en Express");
});

app.get("/inicio", (req, res) =>{
  res.send("Inicio de Lab Clinico");
});

app.get("/examenes", (req, res) =>{
  res.json([{
    name: "Glucosa en orina",
    price: 1000
  },
  {
    name: "Identificacion de bacterias",
    price: 1500
  }]);
});

app.get('/examenes/:id', (req, res) => {
  const { id } = req.params;
  res.json({
    id,
    name: "Glucosa en orina",
    price: 1000
  });
});

app.get('/categories/:categoryId/examenes/:examenId', (req, res) => {
  const { categoryId, examenId } = req.params;
  res.json({
      categoryId,
      examenId
  });
});

app.listen(port, () =>{
  console.log("My port: " + port);
});
