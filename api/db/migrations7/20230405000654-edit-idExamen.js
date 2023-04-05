'use strict';

const { ExamenSchema, EXAMEN_TABLE } = require('../models/examen.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(EXAMEN_TABLE, ExamenSchema);
  },

  async down (queryInterface) {
    await queryInterface.drop(EXAMEN_TABLE);
  }
};
