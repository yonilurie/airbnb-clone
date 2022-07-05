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
				{
					ownerId: 3,
					address: "123 Kelley",
					city: "Seattle",
					state: "Washington",
					country: "United States of America",
					lat: 50,
					lng: 20,
					name: "Kelley Kringle's Abode",
					description: "Place where Kelley lives",
					price: 225,
					previewImage:
						"https://live.staticflickr.com/8002/7694480048_dbfe651ede_b.jpg",
				},
				{
					ownerId: 2,
					address: "123 Steve",
					city: "Seattle",
					state: "Washington",
					country: "United States of America",
					lat: 501,
					lng: 400,
					name: "Steve Goldberg's house",
					description: "Place where Steve lives",
					price: 225,
					previewImage:
						"https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Dickinson_House.jpg/1280px-Dickinson_House.jpg",
				},
				{
					ownerId: 4,
					address: "123 Neo",
					city: "Seattle",
					state: "Washington",
					country: "United States of America",
					lat: 54,
					lng: 450,
					name: "Neo's house",
					description: "Place where Neo lives",
					price: 225,
					previewImage: "http://i.stack.imgur.com/akoPE.jpg",
				},
				{
					ownerId: 5,
					address: "123 Morpheus",
					city: "Chicago",
					state: "Illinois",
					country: "United States of America",
					lat: 22,
					lng: 30,
					name: "Morpheus's house",
					description: "Place where Morpheus lives",
					price: 225,
					previewImage: "http://i.stack.imgur.com/akoPE.jpg",
				},
				{
					ownerId: 6,
					address: "123 Queen",
					city: "Westminster",
					state: "London",
					country: "United Kingdom",
					lat: 200,
					lng: 300,
					name: "Queen's house",
					description: "Place where the Queen lives",
					price: 225,
					previewImage:
						"https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Buckingham_Palace_aerial_view_2016_(cropped).jpg/1200px-Buckingham_Palace_aerial_view_2016_(cropped).jpg",
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
					[Op.in]: [1, 2, 3, 4, 5, 6, 7, 8],
				},
			},
			{}
		);
	},
};
