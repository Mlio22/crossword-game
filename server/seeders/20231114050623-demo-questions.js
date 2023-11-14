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
      "Questions",
      [
        {
          word: "HTML",
          GameId: 1,
          startCoordinateX: 1,
          startCoordinateY: 1,
          direction: "straightward",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          word: "JSON",
          GameId: 1,
          startCoordinateX: 8,
          startCoordinateY: 2,
          direction: "downward",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          word: "CSS",
          GameId: 1,
          startCoordinateX: 7,
          startCoordinateY: 3,
          direction: "straightward",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          word: "GRID",
          GameId: 1,
          startCoordinateX: 3,
          startCoordinateY: 6,
          direction: "downward",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          word: "REACT",
          GameId: 1,
          startCoordinateX: 3,
          startCoordinateY: 7,
          direction: "straightward",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          word: "UI",
          GameId: 1,
          startCoordinateX: 2,
          startCoordinateY: 9,
          direction: "straightward",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          word: "DOM",
          GameId: 1,
          startCoordinateX: 3,
          startCoordinateY: 10,
          direction: "straightward",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          word: "CORS",
          GameId: 2,
          startCoordinateX: 8,
          startCoordinateY: 1,
          direction: "downward",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          word: "NODE",
          GameId: 2,
          startCoordinateX: 7,
          startCoordinateY: 2,
          direction: "straightward",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          word: "EXPRESS",
          GameId: 2,
          startCoordinateX: 10,
          startCoordinateY: 2,
          direction: "downward",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          word: "CRUD",
          GameId: 2,
          startCoordinateX: 9,
          startCoordinateY: 5,
          direction: "straightward",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          word: "OAUTH",
          GameId: 2,
          startCoordinateX: 4,
          startCoordinateY: 6,
          direction: "downward",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          word: "API",
          GameId: 2,
          startCoordinateX: 4,
          startCoordinateY: 7,
          direction: "straightward",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          word: "REST",
          GameId: 2,
          startCoordinateX: 1,
          startCoordinateY: 9,
          direction: "downward",
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
    await queryInterface.bulkDelete("Questions", null, {});
  },
};
