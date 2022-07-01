"use strict";

module.exports = {
	async up(queryInterface, Sequelize) {
		return queryInterface.bulkInsert("Bookings", [
			{
				roomId: 1,
				userId: 2,
				startDate: "2022 - 07 - 10",
				endDate: "2022 - 07 - 15",
			},
		]);
	},

	async down(queryInterface, Sequelize) {
			const Op = Sequelize.Op;
		return queryInterface.bulkDelete("Bookings", {
			id: { [Op.in]: [1] },
		});
	},
};
