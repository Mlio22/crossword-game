"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("SessionQuestions", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      GameSessionId: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      QuestionId: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      isSolved: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
      },
      solverPlayerId: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("SessionQuestions");
  },
};
