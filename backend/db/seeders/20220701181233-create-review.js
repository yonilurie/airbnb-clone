"use strict";

module.exports = {
	async up(queryInterface, Sequelize) {
		return queryInterface.bulkInsert("Reviews", [
			{
				roomId: 5,
				userId: 1,
				review:
					"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error, nesciunt? Nesciunt accusantium ab eaque fuga placeat similique iusto voluptas nam dolores, aspernatur magni, eos molestias id nisi quaerat? Ullam, id",
				stars: 5,
			},
			{
				roomId: 6,
				userId: 1,
				review:
					"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error, nesciunt? Nesciunt accusantium ab eaque fuga placeat similique iusto voluptas nam dolores, aspernatur magni, eos molestias id nisi quaerat? Ullam, id",
				stars: 5,
			},

			{
				roomId: 1,
				userId: 3,
				review:
					"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error, nesciunt? Nesciunt accusantium ab eaque fuga placeat similique iusto voluptas nam dolores, aspernatur magni, eos molestias id nisi quaerat? Ullam, id",
				stars: 4,
			},
			{
				roomId: 1,
				userId: 4,
				review:
					"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error, nesciunt? Nesciunt accusantium ab eaque fuga placeat similique iusto voluptas nam dolores, aspernatur magni, eos molestias id nisi quaerat? Ullam, id",
				stars: 2,
			},
			{
				roomId: 2,
				userId: 5,
				review:
					"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error, nesciunt? Nesciunt accusantium ab eaque fuga placeat similique iusto voluptas nam dolores, aspernatur magni, eos molestias id nisi quaerat? Ullam, id",
				stars: 5,
			},
			{
				roomId: 4,
				userId: 7,
				review:
					"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error, nesciunt? Nesciunt accusantium ab eaque fuga placeat similique iusto voluptas nam dolores, aspernatur magni, eos molestias id nisi quaerat? Ullam, id",
				stars: 5,
			},
			{
				roomId: 5,
				userId: 8,
				review:
					"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error, nesciunt? Nesciunt accusantium ab eaque fuga placeat similique iusto voluptas nam dolores, aspernatur magni, eos molestias id nisi quaerat? Ullam, id",
				stars: 4.2,
			},
			{
				roomId: 7,
				userId: 2,
				review:
					"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error, nesciunt? Nesciunt accusantium ab eaque fuga placeat similique iusto voluptas nam dolores, aspernatur magni, eos molestias id nisi quaerat? Ullam, id",
				stars: 4.2,
			},
			{
				roomId: 3,
				userId: 2,
				review:
					"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error, nesciunt? Nesciunt accusantium ab eaque fuga placeat similique iusto voluptas nam dolores, aspernatur magni, eos molestias id nisi quaerat? Ullam, id",
				stars: 4.2,
			},
			{
				roomId: 6,
				userId: 8,
				review:
					"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error, nesciunt? Nesciunt accusantium ab eaque fuga placeat similique iusto voluptas nam dolores, aspernatur magni, eos molestias id nisi quaerat? Ullam, id",
				stars: 4.2,
			},
		]);
	},

	async down(queryInterface, Sequelize) {
		const Op = Sequelize.Op;
		return queryInterface.bulkDelete("Reviews", {
			id: { [Op.in]: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] },
		});
	},
};
