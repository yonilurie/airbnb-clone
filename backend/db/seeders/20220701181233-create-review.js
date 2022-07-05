"use strict";


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
			{
				roomId: 8,
				userId: 5,
				review: "What a great time",
				stars: 5,
			},
			{
				roomId: 7,
				userId: 4,
				review: "What a great time",
				stars: 5,
			},
			{
				roomId: 6,
				userId: 2,
				review: "not shabby",
				stars: 4.2,
			},
			{
				roomId: 5,
				userId: 8,
				review: "not shabby",
				stars: 4.2,
			},
			{
				roomId: 4,
				userId: 3,
				review: "not too shabby",
				stars: 4.2,
			},
			{
				roomId: 5,
				userId: 3,
				review: "not quite shabby",
				stars: 4.2,
			},
			{
				roomId: 7,
				userId: 1,
				review: "not quite shabby",
				stars: 4.2,
			},
		]);
	},

	async down(queryInterface, Sequelize) {
		const Op = Sequelize.Op;
		return queryInterface.bulkDelete("Reviews", {
			id: { [Op.in]: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] },
		});
	},
};
