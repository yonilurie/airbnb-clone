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
			{
				reviewId: 2,
				userId: 3,
				imageUrl:
					"https://ohiostate.pressbooks.pub/app/uploads/sites/198/2019/06/farnsworthporch.jpg",
			},
			{
				reviewId: 3,
				userId: 4,
				imageUrl:
					"https://ohiostate.pressbooks.pub/app/uploads/sites/198/2019/06/farnsworthporch.jpg",
			},
			{
				reviewId: 4,
				userId: 5,
				imageUrl:
					"https://ohiostate.pressbooks.pub/app/uploads/sites/198/2019/06/farnsworthporch.jpg",
			},
			{
				reviewId: 5,
				userId: 5,
				imageUrl:
					"https://ohiostate.pressbooks.pub/app/uploads/sites/198/2019/06/farnsworthporch.jpg",
			},
			{
				reviewId: 6,
				userId: 4,
				imageUrl:
					"https://ohiostate.pressbooks.pub/app/uploads/sites/198/2019/06/farnsworthporch.jpg",
			},
			{
				reviewId: 7,
				userId: 2,
				imageUrl:
					"https://ohiostate.pressbooks.pub/app/uploads/sites/198/2019/06/farnsworthporch.jpg",
			},
			{
				reviewId: 8,
				userId: 8,
				imageUrl:
					"https://ohiostate.pressbooks.pub/app/uploads/sites/198/2019/06/farnsworthporch.jpg",
			},
			{
				reviewId: 9,
				userId: 3,
				imageUrl:
					"https://ohiostate.pressbooks.pub/app/uploads/sites/198/2019/06/farnsworthporch.jpg",
			},
			{
				reviewId: 10,
				userId: 3,
				imageUrl:
					"https://ohiostate.pressbooks.pub/app/uploads/sites/198/2019/06/farnsworthporch.jpg",
			},
			{
				reviewId: 11,
				userId: 1,
				imageUrl:
					"https://ohiostate.pressbooks.pub/app/uploads/sites/198/2019/06/farnsworthporch.jpg",
			},
		]);
	},

	async down(queryInterface, Sequelize) {
		const Op = Sequelize.Op;
		return queryInterface.bulkDelete("UserReviewImages", {
			id: { [Op.in]: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] },
		});
	},
};
