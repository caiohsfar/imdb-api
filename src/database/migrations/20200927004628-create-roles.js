"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const RoleTable = await queryInterface.createTable("Roles", {
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

    return RoleTable;
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.dropTable("Roles");
  },
};
