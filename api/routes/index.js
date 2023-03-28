const express = require("express");


const examenesRouter = require('./examenes.router');

function routerApi(app){
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/examenes', examenesRouter);
}

module.exports = routerApi;
