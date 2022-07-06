"use strict";

module.exports = {
	async up(queryInterface, Sequelize) {
		return queryInterface.bulkInsert("Bookings", [
			{
				roomId: 1,
				userId: 3,
				startDate: "2022 - 07 - 10",
				endDate: "2022 - 07 - 15",
			},
			{
				roomId: 1,
				userId: 4,
				startDate: "2022 - 07 - 17",
				endDate: "2022 - 07 - 19",
			},
			{
				roomId: 3,
				userId: 5,
				startDate: "2022 - 07 - 12",
				endDate: "2022 - 07 - 19",
			},
			{
				roomId: 5,
				userId: 7,
				startDate: "2022 - 07 - 12",
				endDate: "2022 - 07 - 19",
			},
			{
				roomId: 6,
				userId: 8,
				startDate: "2022 - 07 - 12",
				endDate: "2022 - 07 - 19",
			},
			{
				roomId: 8,
				userId: 2,
				startDate: "2022 - 07 - 12",
				endDate: "2022 - 07 - 19",
			},
			{
				roomId: 4,
				userId: 2,
				startDate: "2022 - 07 - 12",
				endDate: "2022 - 07 - 19",
			},
			{
				roomId: 7,
				userId: 8,
				startDate: "2022 - 07 - 20",
				endDate: "2022 - 07 - 25",
			},
		]);
	},

	async down(queryInterface, Sequelize) {
		const Op = Sequelize.Op;
		return queryInterface.bulkDelete("Bookings", {
			id: { [Op.in]: [1, 2, 3, 4, 5, 6, 7, 8] },
		});
	},
};
