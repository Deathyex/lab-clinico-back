const { Model, DataTypes, Sequelize } = require('sequelize');

const USER_TABLE = 'users';


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn(USER_TABLE, 'recovery_token', {
      allowNull: true,
      field: "recovery_token",
      type: DataTypes.STRING
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn(USER_TABLE, 'recovery_token');

  }
};
