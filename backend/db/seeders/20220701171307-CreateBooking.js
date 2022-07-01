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
		]);
	},

	async down(queryInterface, Sequelize) {
		const Op = Sequelize.Op;
		return queryInterface.bulkDelete("Bookings", {
			id: { [Op.in]: [1, 2, 3] },
		});
	},
};
