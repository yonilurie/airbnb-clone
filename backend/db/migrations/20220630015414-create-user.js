"use strict";
module.exports = {
	up: async (queryInterface, Sequelize) => {
		return queryInterface.createTable("Users", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			username: {
				type: Sequelize.STRING(30),
				allowNull: false,
				unique: true,
			},
			firstName: {
				type: Sequelize.STRING(30),
				allowNull: false,
			},
			lastName: {
				type: Sequelize.STRING(30),
				allowNull: false,
			},
			description: {
				type: Sequelize.STRING(500),
				allowNull: true,
			},
			email: {
				type: Sequelize.STRING(256),
				allowNull: false,
				unique: true,
			},
			hashedPassword: {
				type: Sequelize.STRING.BINARY,
				allowNull: false,
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
				defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
				defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
			},
		});
	},
	down: async (queryInterface, Sequelize) => {
		return queryInterface.dropTable("Users");
	},
};
