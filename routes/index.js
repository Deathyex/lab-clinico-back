const examenesRouter = require('./examenes.router');

function routerApi(app){
  app.use('/examenes', examenesRouter)
}

module.exports = routerApi;
