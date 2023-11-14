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
      "GameSessions",
      [
        {
          GameId: 1,
          status: "playing",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          GameId: 2,
          status: "Finished",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          GameId: 1,
          status: "waiting",
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

    await queryInterface.bulkDelete("GameSessions", null, {});
  },
};
