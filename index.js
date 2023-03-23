const express = require("express");
const routerApi =  require("./routes");

const { faker } = require("@faker-js/faker");
const randomName = faker.name.fullName();

const app = express();
const port = 3777;

app.use(express.json());

app.get("/", (req, res) =>{
  res.send("Hola mi server en Express");
});

app.get("/inicio", (req, res) =>{
  res.send("Inicio de Lab Clinico");
});

routerApi(app);

// app.get('/users', (req, res) => {
//   const { limit, offset } = req.query;
//   if(limit && offset){
//     res.json({
//       limit,
//       offset
//     })
//   } else{
//     res.send("No hay parametros")
//   };
// });

// app.get('/categories/:categoryId/examenes/:examenId', (req, res) => {
//   const { categoryId, examenId } = req.params;
//   res.json({
//       categoryId,
//       examenId
//   });
// });

app.listen(port, () =>{
  console.log("My port: " + port);
});
