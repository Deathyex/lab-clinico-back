'use strict';

const { ExamenSchema, EXAMEN_TABLE } = require('../models/examen.model');
const { UserSchema, USER_TABLE } = require('../models/user.model');
const { ResultadoSchema, RESULTADO_TABLE } = require('../models/resultado.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    await queryInterface.dropTable(RESULTADO_TABLE);
  },
  async down (queryInterface) {

  }
};
