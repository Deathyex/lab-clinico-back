const express = require('express');
const passport = require('passport');

const ResultadosService = require('./../services/resultados.service');
const { config } = require('../config/config');

const router = express.Router();
const service =  new ResultadosService();

router.get('/mis-resultados',
  passport.authenticate('jwt', {session: false}),
  async (req, res, next) => {
    try {
      const user = req.user
      const resultados = await service.findByUser(user.sub);
      res.json(resultados);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
