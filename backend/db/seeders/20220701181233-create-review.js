"use strict";

const review = require("../models/review");

module.exports = {
	async up(queryInterface, Sequelize) {
		return queryInterface.bulkInsert("Reviews", [
			{
				roomId: 1,
				userId: 3,
				review: "Amazing Room!",
				stars: 5,
			},
		]);
	},

	async down(queryInterface, Sequelize) {
		const Op = Sequelize.Op;
		return queryInterface.bulkDelete("Reviews", {
			id: { [Op.in]: [1] },
		});
	},
};
