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
					description:
						"Nunc vestibulum eros eget nisi euismod, vitae accumsan velit mattis. Curabitur eget faucibus magna, faucibus placerat orci. Suspendisse massa ipsum, ultricies vitae rutrum at, efficitur eu sem. Vivamus luctus eget tellus non auctor. Vivamus quis molestie ipsum, dignissim dignissim eros. Aliquam at metus vel nulla tempor congue. Vestibulum ac feugiat neque, eu imperdiet urna. Pellentesque id ultricies dolor, ac porta sapien. Cras posuere in neque ut lobortis. Cras sagittis, erat nec volutpat facilisis, ante sem efficitur lectus, at faucibus mi mi vitae sapien. Aenean ornare neque lacus, a laoreet leo varius vel. Aenean efficitur diam vitae efficitur feugiat.",
					hashedPassword: bcrypt.hashSync("password"),
				},
				{
					email: "user1@user.io",
					username: "FakeUser1",
					firstName: "Steve",
					lastName: "Goldberg",
					description:
						"Nunc vestibulum eros eget nisi euismod, vitae accumsan velit mattis. Curabitur eget faucibus magna, faucibus placerat orci. Suspendisse massa ipsum, ultricies vitae rutrum at, efficitur eu sem. Vivamus luctus eget tellus non auctor. Vivamus quis molestie ipsum, dignissim dignissim eros. Aliquam at metus vel nulla tempor congue. Vestibulum ac feugiat neque, eu imperdiet urna. Pellentesque id ultricies dolor, ac porta sapien. Cras posuere in neque ut lobortis. Cras sagittis, erat nec volutpat facilisis, ante sem efficitur lectus, at faucibus mi mi vitae sapien. Aenean ornare neque lacus, a laoreet leo varius vel. Aenean efficitur diam vitae efficitur feugiat.",

					hashedPassword: bcrypt.hashSync("password2"),
				},
				{
					email: "user2@user.io",
					username: "FakeUser2",
					firstName: "Kelley",
					lastName: "Kringle",
					description:
						"Nunc vestibulum eros eget nisi euismod, vitae accumsan velit mattis. Curabitur eget faucibus magna, faucibus placerat orci. Suspendisse massa ipsum, ultricies vitae rutrum at, efficitur eu sem. Vivamus luctus eget tellus non auctor. Vivamus quis molestie ipsum, dignissim dignissim eros. Aliquam at metus vel nulla tempor congue. Vestibulum ac feugiat neque, eu imperdiet urna. Pellentesque id ultricies dolor, ac porta sapien. Cras posuere in neque ut lobortis. Cras sagittis, erat nec volutpat facilisis, ante sem efficitur lectus, at faucibus mi mi vitae sapien. Aenean ornare neque lacus, a laoreet leo varius vel. Aenean efficitur diam vitae efficitur feugiat.",

					hashedPassword: bcrypt.hashSync("password3"),
				},
				{
					email: "user3@user.io",
					username: "FakeUser3",
					firstName: "Mike",
					lastName: "Washington",
					description:
						"Nunc vestibulum eros eget nisi euismod, vitae accumsan velit mattis. Curabitur eget faucibus magna, faucibus placerat orci. Suspendisse massa ipsum, ultricies vitae rutrum at, efficitur eu sem. Vivamus luctus eget tellus non auctor. Vivamus quis molestie ipsum, dignissim dignissim eros. Aliquam at metus vel nulla tempor congue. Vestibulum ac feugiat neque, eu imperdiet urna. Pellentesque id ultricies dolor, ac porta sapien. Cras posuere in neque ut lobortis. Cras sagittis, erat nec volutpat facilisis, ante sem efficitur lectus, at faucibus mi mi vitae sapien. Aenean ornare neque lacus, a laoreet leo varius vel. Aenean efficitur diam vitae efficitur feugiat.",

					hashedPassword: bcrypt.hashSync("password4"),
				},
				{
					email: "user4@user.io",
					username: "FakeUser4",
					firstName: "Marco",
					lastName: "Polo",
					description:
						"Nunc vestibulum eros eget nisi euismod, vitae accumsan velit mattis. Curabitur eget faucibus magna, faucibus placerat orci. Suspendisse massa ipsum, ultricies vitae rutrum at, efficitur eu sem. Vivamus luctus eget tellus non auctor. Vivamus quis molestie ipsum, dignissim dignissim eros. Aliquam at metus vel nulla tempor congue. Vestibulum ac feugiat neque, eu imperdiet urna. Pellentesque id ultricies dolor, ac porta sapien. Cras posuere in neque ut lobortis. Cras sagittis, erat nec volutpat facilisis, ante sem efficitur lectus, at faucibus mi mi vitae sapien. Aenean ornare neque lacus, a laoreet leo varius vel. Aenean efficitur diam vitae efficitur feugiat.",

					hashedPassword: bcrypt.hashSync("password5"),
				},
				{
					email: "user5@user.io",
					username: "FakeUser5",
					firstName: "Victor",
					lastName: "Stags",
					description:
						"Nunc vestibulum eros eget nisi euismod, vitae accumsan velit mattis. Curabitur eget faucibus magna, faucibus placerat orci. Suspendisse massa ipsum, ultricies vitae rutrum at, efficitur eu sem. Vivamus luctus eget tellus non auctor. Vivamus quis molestie ipsum, dignissim dignissim eros. Aliquam at metus vel nulla tempor congue. Vestibulum ac feugiat neque, eu imperdiet urna. Pellentesque id ultricies dolor, ac porta sapien. Cras posuere in neque ut lobortis. Cras sagittis, erat nec volutpat facilisis, ante sem efficitur lectus, at faucibus mi mi vitae sapien. Aenean ornare neque lacus, a laoreet leo varius vel. Aenean efficitur diam vitae efficitur feugiat.",

					hashedPassword: bcrypt.hashSync("password6"),
				},
				{
					email: "user6@user.io",
					username: "FakeUser6",
					firstName: "Bob",
					lastName: "Johnson",
					description:
						"Nunc vestibulum eros eget nisi euismod, vitae accumsan velit mattis. Curabitur eget faucibus magna, faucibus placerat orci. Suspendisse massa ipsum, ultricies vitae rutrum at, efficitur eu sem. Vivamus luctus eget tellus non auctor. Vivamus quis molestie ipsum, dignissim dignissim eros. Aliquam at metus vel nulla tempor congue. Vestibulum ac feugiat neque, eu imperdiet urna. Pellentesque id ultricies dolor, ac porta sapien. Cras posuere in neque ut lobortis. Cras sagittis, erat nec volutpat facilisis, ante sem efficitur lectus, at faucibus mi mi vitae sapien. Aenean ornare neque lacus, a laoreet leo varius vel. Aenean efficitur diam vitae efficitur feugiat.",

					hashedPassword: bcrypt.hashSync("password7"),
				},
				{
					email: "user7@user.io",
					username: "FakeUser7",
					firstName: "Veronica",
					lastName: "Daniels",
					description:
						"Nunc vestibulum eros eget nisi euismod, vitae accumsan velit mattis. Curabitur eget faucibus magna, faucibus placerat orci. Suspendisse massa ipsum, ultricies vitae rutrum at, efficitur eu sem. Vivamus luctus eget tellus non auctor. Vivamus quis molestie ipsum, dignissim dignissim eros. Aliquam at metus vel nulla tempor congue. Vestibulum ac feugiat neque, eu imperdiet urna. Pellentesque id ultricies dolor, ac porta sapien. Cras posuere in neque ut lobortis. Cras sagittis, erat nec volutpat facilisis, ante sem efficitur lectus, at faucibus mi mi vitae sapien. Aenean ornare neque lacus, a laoreet leo varius vel. Aenean efficitur diam vitae efficitur feugiat.",

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
