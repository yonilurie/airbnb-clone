"use strict";

module.exports = {
	async up(queryInterface, Sequelize) {
		return queryInterface.bulkInsert(
			"Rooms",
			[
				{
					ownerId: 1,
					address: "123 Disney Lane",
					city: "San Francisco",
					state: "California",
					country: "United States of America",
					lat: 37.7645358,
					lng: 122.4730327,
					name: "App Academy",
					description: "Place where web developers are created",
					price: 123,
					previewImage:
						"https://ohiostate.pressbooks.pub/app/uploads/sites/198/2019/06/farnsworthporch.jpg",
				},
			],
			{}
		);
	},

	async down(queryInterface, Sequelize) {
		const Op = Sequelize.Op;
		return queryInterface.bulkDelete(
			"Rooms",
			{
				id: {
					[Op.in]: [1],
				},
			},
			{}
		);
	},
};
