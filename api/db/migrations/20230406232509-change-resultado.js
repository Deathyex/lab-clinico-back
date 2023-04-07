'use strict';

const { ResultadoSchema, RESULTADO_TABLE } = require('../models/resultado.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.dropTable(RESULTADO_TABLE);
    await queryInterface.createTable(RESULTADO_TABLE, ResultadoSchema);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable(RESULTADO_TABLE);
  }
};
