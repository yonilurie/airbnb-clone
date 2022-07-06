"use strict";
const bcrypt = require("bcryptjs");

module.exports = {
	up: async (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert(
			"Users",
			[
				{
					email: "demo@user.io",
					username: "Demo-lition",
					firstName: "John",
					lastName: "Smith",
					hashedPassword: bcrypt.hashSync("password"),
				},
				{
					email: "user1@user.io",
					username: "FakeUser1",
					firstName: "Steve",
					lastName: "Goldberg",
					hashedPassword: bcrypt.hashSync("password2"),
				},
				{
					email: "user2@user.io",
					username: "FakeUser2",
					firstName: "Kelley",
					lastName: "Kringle",
					hashedPassword: bcrypt.hashSync("password3"),
				},
				{
					email: "user3@user.io",
					username: "FakeUser3",
					firstName: "Neo",
					lastName: "Matrix",
					hashedPassword: bcrypt.hashSync("password4"),
				},
				{
					email: "user4@user.io",
					username: "FakeUser4",
					firstName: "Morpheus",
					lastName: "Smorpheus",
					hashedPassword: bcrypt.hashSync("password5"),
				},
				{
					email: "user5@user.io",
					username: "FakeUser5",
					firstName: "Queen",
					lastName: "Elizabeth",
					hashedPassword: bcrypt.hashSync("password6"),
				},
				{
					email: "user6@user.io",
					username: "FakeUser6",
					firstName: "Muhammad",
					lastName: "Ali",
					hashedPassword: bcrypt.hashSync("password7"),
				},
				{
					email: "user7@user.io",
					username: "FakeUser7",
					firstName: "Betty",
					lastName: "Boop",
					hashedPassword: bcrypt.hashSync("password8"),
				},
			],
			{}
		);
	},

	down: async (queryInterface, Sequelize) => {
		const Op = Sequelize.Op;
		return queryInterface.bulkDelete(
			"Users",
			{
				username: {
					[Op.in]: [
						"Demo-lition",
						"FakeUser1",
						"FakeUser2",
						"FakeUser3",
						"FakeUser4",
						"FakeUser5",
					],
				},
			},
			{}
		);
	},
};
