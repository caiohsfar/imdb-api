"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const MoviesTable = await queryInterface.createTable("Movies", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      genders: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      actors: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      director: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      description: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date(),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date(),
      },
    });

    return MoviesTable;
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.dropTable("Movies");
  },
};
