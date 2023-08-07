'use strict';

const { ExamenSchema, EXAMEN_TABLE } = require('../models/examen.model');
const { UserSchema, USER_TABLE } = require('../models/user.model');
const { ResultadoSchema, RESULTADO_TABLE } = require('../models/resultado.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    await queryInterface.createTable(EXAMEN_TABLE, ExamenSchema);
    await queryInterface.createTable(USER_TABLE, UserSchema);
    await queryInterface.createTable(RESULTADO_TABLE, ResultadoSchema);
  },
  async down (queryInterface) {
    await queryInterface.dropTable(EXAMEN_TABLE);
    await queryInterface.dropTable(USER_TABLE);
    await queryInterface.dropTable(RESULTADO_TABLE);
  }
};
