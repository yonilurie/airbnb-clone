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
					numOfReviews: 3,
					previewImage:
						"https://ohiostate.pressbooks.pub/app/uploads/sites/198/2019/06/farnsworthporch.jpg",
				},
				{
					ownerId: 1,
					address: "124 Disney Lane",
					city: "San Francisco",
					state: "California",
					country: "United States of America",
					lat: 37.7645358,
					lng: 122.4730327,
					name: "App Academy Two",
					description: "Place where web developers are created again",
					price: 225,
					numOfReviews: 1,
					previewImage:
						"https://upload.wikimedia.org/wikipedia/commons/7/75/Rufus_Rand_Summer_House.jpg",
				},
				{
					ownerId: 2,
					address: "500 Javascript Road",
					city: "Seattle",
					state: "Washington",
					country: "United States of America",
					lat: 47.619915,
					lng: -122.34792,
					name: "App Academy Two",
					description: "Place where web developers are created again",
					price: 225,
					previewImage:
						"https://upload.wikimedia.org/wikipedia/commons/7/75/Rufus_Rand_Summer_House.jpg",
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
					[Op.in]: [1,2,3],
				},
			},
			{}
		);
	},
};
