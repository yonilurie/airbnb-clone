"use strict";

module.exports = {
	async up(queryInterface, Sequelize) {
		return queryInterface.bulkInsert(
			"Rooms",
			[
				{
					ownerId: 1,
					address: "57 Montague St",
					city: "Brooklyn",
					state: "New York",
					country: "United States",
					lat: 40.69578427284127,
					lng: -73.99679545765709,
					name: "Apartment Near the Statue of Liberty ",
					description:
						"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus id augue sed neque euismod posuere. Nulla facilisi. Sed purus ligula, molestie vel condimentum et, rutrum et mi. Sed pretium id neque vel tempus. Suspendisse id dolor eu dolor rhoncus luctus eu eget nisl. Duis eget felis dapibus, convallis tellus sed, dictum quam. Proin quis urna sapien. Aenean posuere semper massa sit amet varius. Nullam faucibus ",
					price: 200.0,
					guests: 2,
					bedrooms: 2,
					beds: 2,
					baths: 1,
					previewImage:
						"https://bucket-airbnb-clone.s3.us-west-2.amazonaws.com/1664509261002.webp",
				},
				// {
				// 	ownerId: 1,
				// 	address: "124 San Francisco Way",
				// 	city: "San Francisco",
				// 	state: "California",
				// 	country: "United States",
				// 	lat: 33.76,
				// 	lng: 102.47,
				// 	name: "App Academy Two",
				// 	description:
				// 		"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus id augue sed neque euismod posuere. Nulla facilisi. Sed purus ligula, molestie vel condimentum et, rutrum et mi. Sed pretium id neque vel tempus. Suspendisse id dolor eu dolor rhoncus luctus eu eget nisl. Duis eget felis dapibus, convallis tellus sed, dictum quam. Proin quis urna sapien. Aenean posuere semper massa sit amet varius. Nullam faucibus auctor urna vel porttitor. Aenean ante lectus, ",
				// 	price: 200.0,
				// 	previewImage:
				// 		"https://images.squarespace-cdn.com/content/53d8c957e4b0ba978ec957bc/1408893792999-OGR3EVJLW951EFYC9QA9/?format=1000w&content-type=image%2Fjpeg",
				// },
				{
					ownerId: 2,
					address: "510 N Cedar St",
					city: "Chelan",
					state: "Washington",
					country: "United States",
					lat: 47.844102466221166,
					lng: -120.0195970380349,
					name: "Apartment next to the Lake",
					description:
						"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus id augue sed neque euismod posuere. Nulla facilisi. Sed purus ligula, molestie vel condimentum et, rutrum et mi. Sed pretium id neque vel tempus. Suspendisse id dolor eu dolor rhoncus luctus eu eget nisl. Duis eget felis dapibus, convallis tellus sed, dictum quam. Proin quis urna sapien. Aenean posuere semper massa sit amet varius. Nullam faucibus auctor urna vel porttitor. Aenean ante lectus, ",
					price: 500.0,
					guests: 2,
					bedrooms: 2,
					beds: 2,
					baths: 1,
					previewImage:
						"https://bucket-airbnb-clone.s3.us-west-2.amazonaws.com/1664509936932.jpeg",
				},
				{
					ownerId: 3,
					address: "1422 6th St",
					city: "Santa Monica",
					state: "California",
					country: "United States",
					lat: 34.01730333608872,
					lng: -118.49266401505406,
					name: "Quaint Apartment near Santa Monica Pier",
					description:
						"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus id augue sed neque euismod posuere. Nulla facilisi. Sed purus ligula, molestie vel condimentum et, rutrum et mi. Sed pretium id neque vel tempus. Suspendisse id dolor eu dolor rhoncus luctus eu eget nisl. Duis eget felis dapibus, convallis tellus sed, dictum quam. Proin quis urna sapien. Aenean posuere semper massa sit amet varius. Nullam faucibus auctor urna vel porttitor. Aenean ante lectus, ",
					price: 500,
					guests: 2,
					bedrooms: 2,
					beds: 2,
					baths: 1,
					previewImage:
						"https://bucket-airbnb-clone.s3.us-west-2.amazonaws.com/1664510359804.jpeg",
				},
				{
					ownerId: 2,
					address: "1430 2nd Ave",
					city: "Seattle",
					state: "Washington",
					country: "United States",
					lat: 47.609099543070876,
					lng: -122.33837333645889,
					name: "Cozy Apartment near the city",
					description:
						"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus id augue sed neque euismod posuere. Nulla facilisi. Sed purus ligula, molestie vel condimentum et, rutrum et mi. Sed pretium id neque vel tempus. Suspendisse id dolor eu dolor rhoncus luctus eu eget nisl. Duis eget felis dapibus, convallis tellus sed, dictum quam. Proin quis urna sapien. Aenean posuere semper massa sit amet varius. Nullam faucibus auctor urna vel porttitor. Aenean ante lectus, ",
					price: 190.0,
					guests: 2,
					bedrooms: 2,
					beds: 2,
					baths: 1,
					previewImage:
						"https://bucket-airbnb-clone.s3.us-west-2.amazonaws.com/1664510715830.jpeg",
				},
				{
					ownerId: 4,
					address: "1900 1st Ave",
					city: "Seattle",
					state: "Washington",
					country: "United States",
					lat: 47.610717540690025,
					lng: -122.34149763385398,
					name: "Seattle Apartment on 1st",
					description:
						"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus id augue sed neque euismod posuere. Nulla facilisi. Sed purus ligula, molestie vel condimentum et, rutrum et mi. Sed pretium id neque vel tempus. Suspendisse id dolor eu dolor rhoncus luctus eu eget nisl. Duis eget felis dapibus, convallis tellus sed, dictum quam. Proin quis urna sapien. Aenean posuere semper massa ",
					price: 350.0,
					guests: 2,
					bedrooms: 2,
					beds: 2,
					baths: 1,
					previewImage:
						"https://bucket-airbnb-clone.s3.us-west-2.amazonaws.com/1664511204513.webp",
				},
				{
					ownerId: 5,
					address: "555 W Madison St",
					city: "Chicago",
					state: "Illinois",
					country: "United States",
					lat: 41.881319893678274,
					lng: -87.64158356695147,
					name: "Apartment with view of the river",
					description:
						"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus id augue sed neque euismod posuere. Nulla facilisi. Sed purus ligula, molestie vel condimentum et, rutrum et mi. Sed pretium id neque vel tempus. Suspendisse id dolor eu dolor rhoncus luctus eu eget nisl. Duis eget felis dapibus, convallis tellus sed, dictum quam. Proin quis urna sapien. Aenean posuere semper massa ",
					price: 600.0,
					guests: 2,
					bedrooms: 2,
					beds: 2,
					baths: 1,
					previewImage:
						"https://bucket-airbnb-clone.s3.us-west-2.amazonaws.com/1664511509761.webp",
				},
				{
					ownerId: 6,
					address: "650 Vista Terrace Dr",
					city: "Montgomery",
					state: "Alabama",
					country: "United States",
					lat: 32.4207663128163,
					lng: -86.27188922700208,
					name: "Apartment Near the Zoo",
					description:
						"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus id augue sed neque euismod posuere. Nulla facilisi. Sed purus ligula, molestie vel condimentum et, rutrum et mi. Sed pretium id neque vel tempus. Suspendisse id dolor eu dolor rhoncus luctus eu eget nisl. Duis eget felis dapibus, convallis tellus sed, dictum quam. Proin quis urna sapien. Aenean posuere semper massa ",
					price: 100.0,
					guests: 2,
					bedrooms: 2,
					beds: 2,
					baths: 1,
					previewImage:
						"https://bucket-airbnb-clone.s3.us-west-2.amazonaws.com/1664511887803.webp",
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
