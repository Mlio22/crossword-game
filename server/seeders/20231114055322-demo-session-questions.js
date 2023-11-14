"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    await queryInterface.bulkInsert(
      "SessionQuestions",
      [
        {
          GameSessionId: 1,
          QuestionId: 1,
          isSolved: false,
          solverPlayerId: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          GameSessionId: 1,
          QuestionId: 2,
          isSolved: true,
          solverPlayerId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          GameSessionId: 1,
          QuestionId: 3,
          isSolved: true,
          solverPlayerId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          GameSessionId: 1,
          QuestionId: 4,
          isSolved: false,
          solverPlayerId: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          GameSessionId: 1,
          QuestionId: 5,
          isSolved: true,
          solverPlayerId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          GameSessionId: 1,
          QuestionId: 6,
          isSolved: true,
          solverPlayerId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          GameSessionId: 1,
          QuestionId: 7,
          isSolved: true,
          solverPlayerId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          GameSessionId: 2,
          QuestionId: 8,
          isSolved: false,
          solverPlayerId: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          GameSessionId: 2,
          QuestionId: 9,
          isSolved: true,
          solverPlayerId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          GameSessionId: 2,
          QuestionId: 10,
          isSolved: true,
          solverPlayerId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          GameSessionId: 2,
          QuestionId: 11,
          isSolved: true,
          solverPlayerId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          GameSessionId: 2,
          QuestionId: 12,
          isSolved: true,
          solverPlayerId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          GameSessionId: 2,
          QuestionId: 13,
          isSolved: false,
          solverPlayerId: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          GameSessionId: 2,
          QuestionId: 14,
          isSolved: true,
          solverPlayerId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          GameSessionId: 3,
          QuestionId: 1,
          isSolved: false,
          solverPlayerId: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          GameSessionId: 3,
          QuestionId: 2,
          isSolved: false,
          solverPlayerId: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          GameSessionId: 3,
          QuestionId: 3,
          isSolved: false,
          solverPlayerId: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          GameSessionId: 3,
          QuestionId: 4,
          isSolved: false,
          solverPlayerId: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          GameSessionId: 3,
          QuestionId: 5,
          isSolved: false,
          solverPlayerId: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          GameSessionId: 3,
          QuestionId: 6,
          isSolved: false,
          solverPlayerId: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          GameSessionId: 3,
          QuestionId: 7,
          isSolved: false,
          solverPlayerId: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete("SessionQuestions", null, {});
  },
};
