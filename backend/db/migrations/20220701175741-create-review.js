"use strict";
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("Reviews", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			roomId: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: { model: "Rooms" },
				onDelete: "CASCADE",
			},
			userId: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: { model: "Users" },
				onDelete: "CASCADE",
			},
			review: {
				type: Sequelize.STRING(1000),
				allowNull: false,
			},
			stars: {
				type: Sequelize.INTEGER,
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
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("Reviews");
	},
};
