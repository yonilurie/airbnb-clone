const express = require("express");
const router = express.Router();
const { Room, Review, User, UserReviewImage } = require("../db/models");

//Get all Rooms
router.get("/", async (req, res) => {
	const Rooms = await Room.findAll({
		attributes: {
			exclude: ["numOfReviews"],
		},
	});

	res.status = 200;
	res.json({
		Rooms,
	});
});

//Get all reviews of a room by id
router.get("/:roomId/reviews", async (req, res) => {
	let Reviews = await Review.findAll({
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
			},
			{
				model: UserReviewImage,
				as: "images",
				attributes: ["imageUrl"],
			},
		],
	});

	if (!Reviews.length) {
		res.status = 404;
		res.json({
			message: "Spot couldn't be found",
			statusCode: 404,
		});
	}
	
	res.status = 200;
	res.json(Reviews);
});

module.exports = router;
