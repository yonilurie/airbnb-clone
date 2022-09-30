"use strict";

module.exports = {
	async up(queryInterface, Sequelize) {
		return queryInterface.bulkInsert("Bookings", [
			{
				roomId: 5,
				userId: 1,
				guests: 1,
				startDate: new Date(2020, 6, 11),
				endDate: new Date(2020, 6, 15),
			},
			{
				roomId: 6,
				userId: 1,
				guests: 1,
				startDate: new Date(2020, 6, 16),
				endDate: new Date(2020, 6, 17),
			},
			{
				roomId: 6,
				userId: 1,
				guests: 1,
				startDate: new Date(2023, 6, 11),
				endDate: new Date(2023, 6, 15),
			},
			{
				roomId: 1,
				userId: 3,
				guests: 1,
				startDate: new Date(2022, 6, 11),
				endDate: new Date(2022, 6, 15),
			},
			{
				roomId: 1,
				userId: 4,
				guests: 1,
				startDate: new Date(2022, 6, 17),
				endDate: new Date(2022, 6, 19),
			},
			{
				roomId: 2,
				userId: 5,
				guests: 1,
				startDate: new Date(2022, 6, 12),
				endDate: new Date(2022, 6, 19),
			},
			{
				roomId: 4,
				userId: 7,
				guests: 1,
				startDate: new Date(2022, 6, 12),
				endDate: new Date(2022, 6, 19),
			},
			{
				roomId: 5,
				userId: 8,
				guests: 1,
				startDate: new Date(2022, 6, 12),
				endDate: new Date(2022, 6, 19),
			},
			{
				roomId: 7,
				userId: 2,
				guests: 1,
				startDate: new Date(2022, 6, 12),
				endDate: new Date(2022, 6, 19),
			},
			{
				roomId: 3,
				userId: 2,
				guests: 1,
				startDate: new Date(2022, 6, 12),
				endDate: new Date(2022, 6, 19),
			},
			{
				roomId: 6,
				userId: 8,
				guests: 1,
				startDate: new Date(2022, 6, 20),
				endDate: new Date(2022, 6, 25),
			},
		]);
	},

	async down(queryInterface, Sequelize) {
		const Op = Sequelize.Op;
		return queryInterface.bulkDelete("Bookings", {
			id: { [Op.in]: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] },
		});
		return queryInterface.drop;
	},
};
