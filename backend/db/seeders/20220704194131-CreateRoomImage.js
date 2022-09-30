"use strict";

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert("UserRoomImages", [
			{
				roomId: 1,
				userId: 1,
				imageUrl:
					"https://bucket-airbnb-clone.s3.us-west-2.amazonaws.com/1664509261015.webp",
			},
			{
				roomId: 1,
				userId: 1,
				imageUrl:
					"https://bucket-airbnb-clone.s3.us-west-2.amazonaws.com/1664509261009.webp",
			},
			{
				roomId: 1,
				userId: 1,
				imageUrl:
					"https://bucket-airbnb-clone.s3.us-west-2.amazonaws.com/1664509261013.webp",
			},
			{
				roomId: 1,
				userId: 1,
				imageUrl:
					"https://bucket-airbnb-clone.s3.us-west-2.amazonaws.com/1664509261018.webp",
			},
			{
				roomId: 2,
				userId: 2,
				imageUrl:
					"https://bucket-airbnb-clone.s3.us-west-2.amazonaws.com/1664509936953.jpeg",
			},
			{
				roomId: 2,
				userId: 2,
				imageUrl:
					"https://bucket-airbnb-clone.s3.us-west-2.amazonaws.com/1664509936956.jpeg",
			},
			{
				roomId: 2,
				userId: 2,
				imageUrl:
					"https://bucket-airbnb-clone.s3.us-west-2.amazonaws.com/1664509936958.jpeg",
			},
			{
				roomId: 2,
				userId: 2,
				imageUrl:
					"https://bucket-airbnb-clone.s3.us-west-2.amazonaws.com/1664509936959.jpeg",
			},
			{
				roomId: 3,
				userId: 3,
				imageUrl:
					"https://bucket-airbnb-clone.s3.us-west-2.amazonaws.com/1664510359825.jpeg",
			},
			{
				roomId: 3,
				userId: 3,
				imageUrl:
					"https://bucket-airbnb-clone.s3.us-west-2.amazonaws.com/1664510359828.jpeg",
			},
			{
				roomId: 3,
				userId: 3,
				imageUrl:
					"https://bucket-airbnb-clone.s3.us-west-2.amazonaws.com/1664510359830.jpeg",
			},
			{
				roomId: 3,
				userId: 3,
				imageUrl:
					"https://bucket-airbnb-clone.s3.us-west-2.amazonaws.com/1664510359831.jpeg",
			},
			{
				roomId: 4,
				userId: 2,
				imageUrl:
					"https://bucket-airbnb-clone.s3.us-west-2.amazonaws.com/1664510715854.jpeg",
			},
			{
				roomId: 4,
				userId: 2,
				imageUrl:
					"https://bucket-airbnb-clone.s3.us-west-2.amazonaws.com/1664510715856.jpeg",
			},
			{
				roomId: 4,
				userId: 2,
				imageUrl:
					"https://bucket-airbnb-clone.s3.us-west-2.amazonaws.com/1664510715858.jpeg",
			},
			{
				roomId: 4,
				userId: 2,
				imageUrl:
					"https://bucket-airbnb-clone.s3.us-west-2.amazonaws.com/1664510715859.jpeg",
			},
			{
				roomId: 5,
				userId: 4,
				imageUrl:
					"https://bucket-airbnb-clone.s3.us-west-2.amazonaws.com/1664511204532.webp",
			},
			{
				roomId: 5,
				userId: 4,
				imageUrl:
					"https://bucket-airbnb-clone.s3.us-west-2.amazonaws.com/1664511204534.webp",
			},
			{
				roomId: 5,
				userId: 4,
				imageUrl:
					"https://bucket-airbnb-clone.s3.us-west-2.amazonaws.com/1664511204535.webp",
			},
			{
				roomId: 5,
				userId: 4,
				imageUrl:
					"https://bucket-airbnb-clone.s3.us-west-2.amazonaws.com/1664511204537.webp",
			},
			{
				roomId: 6,
				userId: 5,
				imageUrl:
					"https://bucket-airbnb-clone.s3.us-west-2.amazonaws.com/1664511509788.webp",
			},
			{
				roomId: 6,
				userId: 5,
				imageUrl:
					"https://bucket-airbnb-clone.s3.us-west-2.amazonaws.com/1664511509791.webp",
			},
			{
				roomId: 6,
				userId: 5,
				imageUrl:
					"https://bucket-airbnb-clone.s3.us-west-2.amazonaws.com/1664511509792.webp",
			},
			{
				roomId: 6,
				userId: 5,
				imageUrl:
					"https://bucket-airbnb-clone.s3.us-west-2.amazonaws.com/1664511509794.webp",
			},
			{
				roomId: 7,
				userId: 6,
				imageUrl:
					"https://bucket-airbnb-clone.s3.us-west-2.amazonaws.com/1664511887822.jpeg",
			},
			{
				roomId: 7,
				userId: 6,
				imageUrl:
					"https://bucket-airbnb-clone.s3.us-west-2.amazonaws.com/1664511887824.jpeg",
			},
			{
				roomId: 7,
				userId: 6,
				imageUrl:
					"https://bucket-airbnb-clone.s3.us-west-2.amazonaws.com/1664511887826.jpeg",
			},
			{
				roomId: 7,
				userId: 6,
				imageUrl:
					"https://bucket-airbnb-clone.s3.us-west-2.amazonaws.com/1664511887827.jpeg",
			},
		]);
	},

	async down(queryInterface, Sequelize) {
		const Op = Sequelize.Op;
		await queryInterface.bulkDelete("UserRoomImages", {
			id: {
				[Op.in]: [
					1,
					2,
					3,
					4,
					5,
					6,
					7,
					8,
					9,
					10,
					11,
					12,
					13,
					14,
					15,
					16,
					17,
					18,
					19,
					20,
					21,
					22,
					23,
					24,
				],
			},
		});
	},
};
