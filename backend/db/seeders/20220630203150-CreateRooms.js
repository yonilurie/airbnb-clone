"use strict";

module.exports = {
	async up(queryInterface, Sequelize) {
		return queryInterface.bulkInsert(
			"Rooms",
			[
				{
					ownerId: 1,
					address: "90 5th Ave",
					city: "New York",
					state: "New York",
					country: "United States",
					lat: 37.76,
					lng: 122.47,
					name: "App Academy",
					description:
						"Place where web developers are created, Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus id augue sed neque euismod posuere. Nulla facilisi. Sed purus ligula, molestie vel condimentum et, rutrum et mi. Sed pretium id neque vel tempus. Suspendisse id dolor eu dolor rhoncus luctus eu eget nisl. Duis eget felis dapibus, convallis tellus sed, dictum quam. Proin quis urna sapien. Aenean posuere semper massa sit amet varius. Nullam faucibus ",
					price: 200.0,
					previewImage:
						"https://rew-online.com/wp-content/uploads/2019/05/90-fifth-avenue-ny-ny.jpg",
				},
				{
					ownerId: 1,
					address: "124 San Francisco Way",
					city: "San Francisco",
					state: "California",
					country: "United States",
					lat: 33.76,
					lng: 102.47,
					name: "App Academy Two",
					description:
						"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus id augue sed neque euismod posuere. Nulla facilisi. Sed purus ligula, molestie vel condimentum et, rutrum et mi. Sed pretium id neque vel tempus. Suspendisse id dolor eu dolor rhoncus luctus eu eget nisl. Duis eget felis dapibus, convallis tellus sed, dictum quam. Proin quis urna sapien. Aenean posuere semper massa sit amet varius. Nullam faucibus auctor urna vel porttitor. Aenean ante lectus, ",
					price: 200.0,
					previewImage:
						"https://images.squarespace-cdn.com/content/53d8c957e4b0ba978ec957bc/1408893792999-OGR3EVJLW951EFYC9QA9/?format=1000w&content-type=image%2Fjpeg",
				},
				{
					ownerId: 2,
					address: "500 Relax Rd",
					city: "Snohomish",
					state: "Washington",
					country: "United States",
					lat: 47.61,
					lng: -122.34,
					name: "Beautiful summer home",
					description:
						"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus id augue sed neque euismod posuere. Nulla facilisi. Sed purus ligula, molestie vel condimentum et, rutrum et mi. Sed pretium id neque vel tempus. Suspendisse id dolor eu dolor rhoncus luctus eu eget nisl. Duis eget felis dapibus, convallis tellus sed, dictum quam. Proin quis urna sapien. Aenean posuere semper massa sit amet varius. Nullam faucibus auctor urna vel porttitor. Aenean ante lectus, ",
					price: 500.0,
					previewImage:
						"https://upload.wikimedia.org/wikipedia/commons/7/75/Rufus_Rand_Summer_House.jpg",
				},
				{
					ownerId: 3,
					address: "123 Kelley",
					city: "Los Angeles",
					state: "California",
					country: "United States",
					lat: 50,
					lng: 20,
					name: "Large home near on the outskirts of the city",
					description:
						"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus id augue sed neque euismod posuere. Nulla facilisi. Sed purus ligula, molestie vel condimentum et, rutrum et mi. Sed pretium id neque vel tempus. Suspendisse id dolor eu dolor rhoncus luctus eu eget nisl. Duis eget felis dapibus, convallis tellus sed, dictum quam. Proin quis urna sapien. Aenean posuere semper massa sit amet varius. Nullam faucibus auctor urna vel porttitor. Aenean ante lectus, ",
					price: 500,
					previewImage:
						"https://californiahome.me/wp-content/uploads/2017/08/20170609_pm_5366_ca_0248-e1502129247173.jpg",
				},
				{
					ownerId: 2,
					address: "123 University Way",
					city: "Seattle",
					state: "Washington",
					country: "United States",
					lat: 85.0,
					lng: 14.0,
					name: "Cozy Home near the city",
					description:
						"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus id augue sed neque euismod posuere. Nulla facilisi. Sed purus ligula, molestie vel condimentum et, rutrum et mi. Sed pretium id neque vel tempus. Suspendisse id dolor eu dolor rhoncus luctus eu eget nisl. Duis eget felis dapibus, convallis tellus sed, dictum quam. Proin quis urna sapien. Aenean posuere semper massa sit amet varius. Nullam faucibus auctor urna vel porttitor. Aenean ante lectus, ",
					price: 190.0,
					previewImage:
						"https://seattlebusinessmag.com/sites/default/files/field/image/1--47954_25_1NEW.jpg",
				},
				{
					ownerId: 4,
					address: "1000 Pike St",
					city: "Seattle",
					state: "Washington",
					country: "United States",
					lat: 54.0,
					lng: 170,
					name: "Seattle Mansion",
					description:
						"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus id augue sed neque euismod posuere. Nulla facilisi. Sed purus ligula, molestie vel condimentum et, rutrum et mi. Sed pretium id neque vel tempus. Suspendisse id dolor eu dolor rhoncus luctus eu eget nisl. Duis eget felis dapibus, convallis tellus sed, dictum quam. Proin quis urna sapien. Aenean posuere semper massa ",
					price: 350.0,
					previewImage:
						"https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Seattle_-_Cotterill_House_04.jpg/800px-Seattle_-_Cotterill_House_04.jpg",
				},
				{
					ownerId: 5,
					address: "123 River St",
					city: "Chicago",
					state: "Illinois",
					country: "United States",
					lat: 22.0,
					lng: 30.0,
					name: "Marvelous house",
					description:
						"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus id augue sed neque euismod posuere. Nulla facilisi. Sed purus ligula, molestie vel condimentum et, rutrum et mi. Sed pretium id neque vel tempus. Suspendisse id dolor eu dolor rhoncus luctus eu eget nisl. Duis eget felis dapibus, convallis tellus sed, dictum quam. Proin quis urna sapien. Aenean posuere semper massa ",
					price: 600.0,
					previewImage:
						"https://ssl.cdn-redfin.com/system_files/media/623734_JPG/genDesktopMapHomeCardUrl/item_6.jpg",
				},
				{
					ownerId: 6,
					address: "123 Alabama St",
					city: "Montgomery",
					state: "Alabama",
					country: "United States",
					lat: 33.0,
					lng: 101.0,
					name: "Alabama Estate",
					description:
						"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus id augue sed neque euismod posuere. Nulla facilisi. Sed purus ligula, molestie vel condimentum et, rutrum et mi. Sed pretium id neque vel tempus. Suspendisse id dolor eu dolor rhoncus luctus eu eget nisl. Duis eget felis dapibus, convallis tellus sed, dictum quam. Proin quis urna sapien. Aenean posuere semper massa ",
					price: 330.0,
					previewImage:
						"https://cdn.homes.com/cgi-bin/readimage/b48296c128c55682a4627db2eac59bed/8543-twin-gables-dr-montgomery-al-36116-0.jpg",
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
