"use strict";
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable(
			"Rooms",
			{
				id: {
					allowNull: false,
					autoIncrement: true,
					primaryKey: true,
					type: Sequelize.INTEGER,
				},
				ownerId: {
					type: Sequelize.INTEGER,
					allowNull: false,
					references: { model: "Users" },
					onDelete: "CASCADE",
				},
				address: {
					type: Sequelize.STRING,
					allowNull: false,
				},
				city: {
					type: Sequelize.STRING,
					allowNull: false,
				},
				state: {
					type: Sequelize.STRING,
					allowNull: false,
				},
				country: {
					type: Sequelize.STRING,
					allowNull: false,
				},
				lat: {
					type: Sequelize.DECIMAL,
					allowNull: false,
				},
				lng: {
					type: Sequelize.DECIMAL,
					allowNull: false,
				},
				name: {
					type: Sequelize.STRING,
					allowNull: false,
				},
				description: {
					type: Sequelize.STRING,
					allowNull: false,
				},
				price: {
					type: Sequelize.INTEGER,
					allowNull: false,
				},
				numOfReviews: {
					type: Sequelize.INTEGER,
					allowNull: true,
					defaultValue: 0,
				},
				previewImage: {
					type: Sequelize.STRING,
					allowNull: true,
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
			},
			{
				uniqueKeys: {
					Unique: {
						fields: ["lat", "lng", "address"],
					},
				},
			}
		);
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("Rooms");
	},
};
