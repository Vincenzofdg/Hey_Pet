'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('sponsors', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      picture: {
        allowNull: false,
        type: Sequelize.STRING
      },
      flier: {
        allowNull: false,
        type: Sequelize.STRING
      }
    });
  },

  async down (queryInterface, _Sequelize) {
    await queryInterface.dropTable('sponsors');
  }
};