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
          hint: "Singkatan HyperText Markup Language",
          direction: "straightward",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          word: "JSON",
          GameId: 1,
          startCoordinateX: 8,
          startCoordinateY: 2,
          hint: "Singkatan JavaScript Object Notation",
          direction: "downward",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          word: "CSS",
          GameId: 1,
          startCoordinateX: 7,
          startCoordinateY: 3,
          hint: "Singkatan Cascading Style Sheets",
          direction: "straightward",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          word: "GRID",
          GameId: 1,
          startCoordinateX: 3,
          startCoordinateY: 6,
          hint: "Cara layouting selain flex",
          direction: "downward",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          word: "REACT",
          GameId: 1,
          startCoordinateX: 3,
          startCoordinateY: 7,
          hint: "Nama framework / library js",
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
          hint: "User Interface",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          word: "DOM",
          GameId: 1,
          startCoordinateX: 3,
          startCoordinateY: 10,
          direction: "straightward",
          hint: "HTML tapi JS Object",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          word: "CORS",
          GameId: 2,
          startCoordinateX: 8,
          startCoordinateY: 1,
          direction: "downward",
          hint: "validasi sumber request",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          word: "NODE",
          GameId: 2,
          startCoordinateX: 7,
          startCoordinateY: 2,
          direction: "straightward",
          hint: "JS tapi bukan di browser",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          word: "EXPRESS",
          GameId: 2,
          startCoordinateX: 10,
          startCoordinateY: 2,
          hint: "Back-end JS",
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
          hint: "Minimal 1 di individual project",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          word: "OAUTH",
          GameId: 2,
          startCoordinateX: 4,
          startCoordinateY: 6,
          direction: "downward",
          hint: "Oooooo Authentikasi",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          word: "API",
          GameId: 2,
          startCoordinateX: 4,
          startCoordinateY: 7,
          hint: "Kecil jadi teman, besar jadi lawan",
          direction: "straightward",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          word: "REST",
          GameId: 2,
          hint: "Representational State Transfer",
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
