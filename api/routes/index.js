const express = require("express");


const examenesRouter = require('./examenes.router');
const usersRouter = require('./users.router');

function routerApi(app){
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/examenes', examenesRouter);
  router.use('/users', usersRouter);
}

module.exports = routerApi;
