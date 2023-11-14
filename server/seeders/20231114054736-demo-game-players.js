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
      "GamePlayers",
      [
        {
          PlayerId: 1,
          GameSessionId: 1,
          username: "Anakbaik1",
          team: "red",
          score: 100,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          PlayerId: 2,
          GameSessionId: 1,
          username: "TemanBaik1",
          team: "blue",
          score: 300,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          PlayerId: 1,
          GameSessionId: 2,
          username: "Anakbaik2",
          team: "red",
          score: 300,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          PlayerId: 2,
          GameSessionId: 2,
          username: "TemanBaik2",
          team: "blue",
          score: 200,
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
  },
};
