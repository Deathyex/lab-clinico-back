const express = require("express");
const cors = require("cors");
const routerApi =  require("./routes");
const { checkApiKey } = require('./middlewares/auth.handler');

const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/error.handler');

const { faker } = require("@faker-js/faker");
const randomName = faker.name.fullName();

const app = express();
const port = process.env.PORT || 3777;

app.use(express.json());

//const whitelist = ["dominios permitidoos"]
/*
const optiones = {
  origin: (origin, callback) => {
    if (whitelist.includes()){
      callback(null, true);
    } else {
      callback(new Error('no permitido');)
    }
  }
}
*/
app.use(cors());

require('./utils/auth');

app.get("/api", (req, res) =>{
  res.send("Hola mi server en Express");
});

app.get("/api/inicio", checkApiKey, (req, res) =>{
  res.send("Inicio de Lab Clinico");
});

routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

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
