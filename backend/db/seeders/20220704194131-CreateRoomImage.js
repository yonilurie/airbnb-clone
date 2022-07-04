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
			{
				roomId: 1,
				userId: 4,
				imageUrl:
					"https://cdn.shopify.com/s/files/1/0482/8121/products/Layer-Chair-by-DyvikDesign-Rear-view-680x1020_800x.jpg?v=1410986365",
			},
		]);
	},

	async down(queryInterface, Sequelize) {
		const Op = Sequelize.Op;
		await queryInterface.bulkDelete("UserRoomImages", {
			id: { [Op.in]: [1, 2] },
		});
	},
};
