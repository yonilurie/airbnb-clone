"use strict";

module.exports = {
	async up(queryInterface, Sequelize) {
		return queryInterface.bulkInsert("Amenities", [
			{
				roomId: 1,
				type: "Wifi",
			},
			{
				roomId: 1,
				type: "Kitchen",
			},
			{
				roomId: 1,
				type: "TV",
			},
			{
				roomId: 1,
				type: "Free Parking",
			},
		]);
	},

	async down(queryInterface, Sequelize) {
		const Op = Sequelize.Op;
		return queryInterface.bulkDelete("Amenities", {
			id: { [Op.in]: [1, 2, 3, 4] },
		});
	},
};
