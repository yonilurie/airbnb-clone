"use strict";

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert("UserRoomImages", [
			{
				roomId: 1,
				userId: 3,
				imageUrl:
					"https://c1.staticflickr.com/5/4471/36872333954_1034ffb258_b.jpg",
			},
		]);
	},

	async down(queryInterface, Sequelize) {
		/**
		 * Add commands to revert seed here.
		 *
		 * Example:
		 * await queryInterface.bulkDelete('People', null, {});
		 */
	},
};
