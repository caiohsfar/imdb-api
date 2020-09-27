"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const UserRoleTable = await queryInterface.createTable("Movies", {
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
      voteAvg: {
        allowNull: false,
        type: Sequelize.FLOAT,
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

    return UserRoleTable;
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.dropTable("Movies");
  },
};
