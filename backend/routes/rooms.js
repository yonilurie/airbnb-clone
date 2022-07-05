const express = require("express");
const router = express.Router();
const sequelize = require("sequelize");
const {
	Room,
	Review,
	User,
	UserReviewImage,
	UserRoomImage,
} = require("../db/models");

//Get all reviews of a room by id
router.get("/:roomId/reviews", async (req, res) => {
	let reviews = await Review.findAll({
		where: {
			roomId: req.params.roomId,
		},
		attributes: [
			"id",
			"userId",
			"roomId",
			"review",
			"stars",
			"createdAt",
			"updatedAt",
		],
		include: [
			{
				model: User,
				attributes: ["id", "firstName", "lastName"],
			},
			{
				model: UserReviewImage,
				as: "images",
				attributes: ["imageUrl"],
			},
		],
	});

	if (!reviews.length) {
		res.status = 404;
		return res.json({
			message: "Spot couldn't be found",
			statusCode: 404,
		});
	}

	res.status = 200;
	return res.json(reviews);
});

//Get details about a room with id
router.get("/:roomId", async (req, res) => {
	let room = await Room.findByPk(req.params.roomId, {
		attributes: [
			"id",
			"ownerId",
			"address",
			"city",
			"state",
			"country",
			"lat",
			"lng",
			"name",
			"description",
			"price",
			"createdAt",
			"updatedAt",
			[
				sequelize.fn("COUNT", sequelize.col("reviews.roomId")),
				"numReviews",
			],
			[
				sequelize.fn("AVG", sequelize.col("reviews.stars")),
				"avgStarRating",
			],
			"images.imageUrl",
		],

		include: [
			{
				model: UserRoomImage,
				as: "images",
				attributes: ["imageUrl"],
			},
			{
				model: User,
				as: "Owner",
				attributes: ["id", "firstName", "lastName"],
			},
			{
				model: Review,
				attributes: [],
			},
		],
		group: "`images`.`imageUrl`",
	});

	if (!room) {
		res.status = 404;
		return res.json({
			message: "Spot couldn't be found",
			statusCode: 404,
		});
	}

	res.status = 200;
	return res.json(room);
});

//Get all Rooms
router.get("/", async (req, res) => {
	const rooms = await Room.findAll({
		attributes: {
			exclude: ["numOfReviews"],
		},
	});

	res.status = 200;
	return res.json({ rooms });
});

module.exports = router;
