"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("products", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      price: {
        allowNull: false,
        type: Sequelize.FLOAT
      },
      description: {
        allowNull: false,
        type: Sequelize.TEXT('medium')
      },
      inStock: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        field: 'in_stock'
      },
      contact: {
        allowNull: false,
        type: Sequelize.STRING,
        defaultValue: '',
      },
      pix: {
        allowNull: false,
        type: Sequelize.STRING,
        defaultValue: '',
      },
      picture: {
        allowNull: false,
        type: Sequelize.STRING
      },
    });
  },
  async down(queryInterface, _Sequelize) {
    await queryInterface.dropTable("products");
  },
};
