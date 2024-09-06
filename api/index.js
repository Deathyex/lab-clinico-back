// Importa los módulos necesarios
const express = require('express');
const cors = require('cors');
const routerApi = require('./routes/routerApi');

// Crea una instancia de Express
const app = express();

// Define el puerto
const port = process.env.PORT || 3777;

// Middleware para parsear el cuerpo de las peticiones a JSON
app.use(express.json());

// Middleware para habilitar CORS (permite solicitudes desde cualquier origen)
app.use(cors());

// Configura las rutas definidas en el archivo routes.js
routerApi(app);

// Inicia el servidor y escucha en el puerto especificado
app.listen(port, () => {
	console.log('Servidor escuchando en el puerto: ' + port);
});
