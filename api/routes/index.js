const express = require("express");

const resultadosRouter = require('./resultados.router');
const usersRouter = require('./users.router');
const examenesRouter = require('./examenes.router');
const authRouter = require('./auth.router');

function routerApi(app){
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/resultados', resultadosRouter);
  router.use('/users', usersRouter);
  router.use('/examenes', examenesRouter);
  router.use('/auth', authRouter);
}

module.exports = routerApi;
