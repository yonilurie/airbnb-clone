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
			{
				roomId: 2,
				userId: 3,
				review: "Amazing Room AGAIN!",
				stars: 5,
			},
			{
				roomId: 1,
				userId: 4,
				review: "Not bad, but could be a bit better",
				stars: 4,
			},
			{
				roomId: 1,
				userId: 5,
				review: "Would not reccomend",
				stars: 2,
			},
		]);
	},

	async down(queryInterface, Sequelize) {
		const Op = Sequelize.Op;
		return queryInterface.bulkDelete("Reviews", {
			id: { [Op.in]: [1,2,3,4] },
		});
	},
};
