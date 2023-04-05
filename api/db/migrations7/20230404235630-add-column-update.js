'use strict';

const { ExamenSchema, EXAMEN_TABLE } = require('../models/examen.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    await queryInterface.addColumn(EXAMEN_TABLE, 'update_at', ExamenSchema.updatedAt);
  },

  async down (queryInterface) {
    await queryInterface.removeColumn(EXAMEN_TABLE, 'update_at', ExamenSchema.updatedAt);
  }
};
