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
        references: {
          model: "GameSessions",
          key: "id",
        },
      },
      QuestionId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Questions",
          key: "id",
        },
      },
      isSolved: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
      },
      SolverPlayerId: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: {
          model: "Players",
          key: "id",
        },
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
