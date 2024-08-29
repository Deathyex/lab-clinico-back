// Importa los módulos necesarios
const express = require("express");
const cors = require("cors");
const routerApi =  require("./routes");

// Importa middlewares
const fileUpload = require('express-fileupload');

// Crea una instancia de Express
const app = express();

// Define el puerto
const port = process.env.PORT || 3777;

// Middleware para manejar la subida de archivos
app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: './api/uploads'
}));

// Middleware para servir archivos estáticos desde la carpeta 'documents'
app.use(express.static('documents'))

// Middleware para parsear el cuerpo de las peticiones a JSON
app.use(express.json());

// Middleware para habilitar CORS (permite solicitudes desde cualquier origen)
app.use(cors());

// Comentario: Requiere un archivo de utilidad para autenticación
require('./utils/auth');

// Ruta principal para verificar si el servidor está en funcionamiento
app.get("/api", (req, res) =>{
  res.send("Hola mi server en Express");
});

// Ruta protegida por un middleware de autenticación (checkApiKey)
app.get("/api/inicio", checkApiKey, (req, res) =>{
  res.send("Inicio de Lab Clinico");
});

// Configura las rutas definidas en el archivo routes.js
routerApi(app);

// Middlewares de manejo de errores


// Comentario: Ejemplo de una ruta que maneja parámetros de consulta
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

// Comentario: Ejemplo de una ruta con parámetros de ruta
// app.get('/categories/:categoryId/examenes/:examenId', (req, res) => {
//   const { categoryId, examenId } = req.params;
//   res.json({
//       categoryId,
//       examenId
//   });
// });

// Inicia el servidor y escucha en el puerto especificado
app.listen(port, () =>{
  console.log("My port: " + port);
});
