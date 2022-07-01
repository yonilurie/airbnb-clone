"use strict";

module.exports = {
	async up(queryInterface, Sequelize) {
		return queryInterface.bulkInsert("UserReviewImages", [
			{
				reviewId: 1,
				userId: 3,
				imageUrl:
					"https://ohiostate.pressbooks.pub/app/uploads/sites/198/2019/06/farnsworthporch.jpg",
			},
		]);
	},

	async down(queryInterface, Sequelize) {
		const Op = Sequelize.Op;
		return queryInterface.bulkDelete("UserReviewImages", {
			id: { [Op.in]: [1] },
		});
	},
};
