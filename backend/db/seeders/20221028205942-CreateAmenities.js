"use strict";

module.exports = {
	async up(queryInterface, Sequelize) {
		let seederData = [];
		for (let i = 1; i <= 7; i++) {
			seederData.push(
				{
					roomId: i,
					type: "Wifi",
				},
				{
					roomId: i,
					type: "Kitchen",
				},
				{
					roomId: i,
					type: "TV",
				},
				{
					roomId: i,
					type: "Free Parking",
				},
				{
					roomId: i,
					type: "Extra pillows and blankets",
				},
				{
					roomId: i,
					type: "Washer",
				},
				{
					roomId: i,
					type: "Dryer",
				},
				{
					roomId: i,
					type: "Hairdryer",
				}
			);
		}
		return queryInterface.bulkInsert("Amenities", seederData);
	},

	async down(queryInterface, Sequelize) {
		const Op = Sequelize.Op;
		return queryInterface.bulkDelete("Amenities", {
			id: { [Op.in]: [1, 2, 3, 4, 5, 6, 7] },
		});
	},
};
