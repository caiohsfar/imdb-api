"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkInsert("Users", [
      {
        name: "Caio",
        passwordHash: "ASJKDHASKJDHAKSJ",
        active: true,
        email: "caio@gmail.com",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Caio Copia",
        passwordHash: "a-hash",
        active: true,
        email: "caio-copia@gmail.com",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkDelete("Users", null, {});
  },
};
