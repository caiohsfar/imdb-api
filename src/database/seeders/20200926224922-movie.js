"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkInsert("Movies", [
      {
        name: "Interstellar",
        genders: "Adventure, Drama, Sci-Fi",
        actors: "Matthew McConaughey, Anne Hathaway, Jessica Chastain",
        director: "Christopher Nolan",
        description:
          "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkDelete("Movies", null, {});
  },
};
