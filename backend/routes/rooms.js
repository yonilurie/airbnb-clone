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
const { restoreUser, requireAuth } = require("../utils/auth");

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

	//If no review then return 404 code
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

//add a review to a room
router.post(
	"/:roomId/reviews",
	[restoreUser, requireAuth],
	async (req, res) => {
		const { roomId } = req.params;
		const { review, stars } = req.body;
		const { id } = req.user;
		//If the request is missing a message or a star rating, return a 400 code
		if (!review || !stars) {
			res.status = 400;
			return res.json({
				message: "Validation error",
				statusCode: 400,
				errors: {
					review: "Review text is required",
					stars: "Stars must be an integer from 1 to 5",
				},
			});
		}
		//Check if a room with that ID exists
		let room = await Room.findByPk(roomId);
		//If it doesnt, return a 404 code
		if (!room) {
			res.status = 404;
			return res.json({
				message: "Spot couldn't be found",
				statusCode: 404,
			});
		}
		//If it does but it is owned by the reviewer, return a 403 code
		if (room.ownerId === id) {
			res.status = 403;
			return res.json({
				message: "You cannot leave a review for your own listing",
			});
		}
		//Find a review on this listing by the user, if it is not found then create one
		const [newReview, created] = await Review.findOrCreate({
			where: {
				roomId: roomId,
				userId: id,
			},
			defaults: {
				review: review,
				stars: stars,
			},
		});
		//If the review exists, return a 403 code
		if (!created) {
			res.status = 403;
			return res.json({
				message: "User already has a review for this spot",
				statusCode: 403,
			});
		}

		res.status = 200;
		return res.json(newReview);
	}
);

//Edit an existing review
router.put(
	"/:roomId/reviews/:reviewId",
	[restoreUser, requireAuth],
	async (req, res) => {
		const { roomId, reviewId } = req.params;
		const { id } = req.user;
		const { review, stars } = req.body;

		//If the request is missing a message or a star rating, return a 400 code
		if (!review || !stars) {
			res.status = 400;
			return res.json({
				message: "Validation error",
				statusCode: 400,
				errors: {
					review: "Review text is required",
					stars: "Stars must be an integer from 1 to 5",
				},
			});
		}
		//Check if a room with that ID exists
		let room = await Room.findByPk(roomId);
		//If it doesnt, return a 404 code
		if (!room) {
			res.status = 404;
			return res.json({
				message: "Spot couldn't be found",
				statusCode: 404,
			});
		}

		let reviewToEdit = await Review.findByPk(reviewId);
		if (reviewToEdit.userId !== id) {
			return res.json({ message: "Can only edit your own comment" });
		}

		reviewToEdit.review = review;
		reviewToEdit.stars = stars;
		reviewToEdit.save();

		res.status = 200;
		return res.json(reviewToEdit);
	}
);

//Add an image to an existing review
router.post(
	"/:roomId/reviews/:reviewId/add-image",
	[restoreUser, requireAuth],
	async (req, res) => {
		const { roomId, reviewId } = req.params;
		const { id } = req.user;
		const { url } = req.body;
		let review = await Review.findByPk(reviewId, {
			include: [
				{
					model: UserReviewImage,
					as: "images",
					attributes: [
						[
							sequelize.fn("COUNT", sequelize.col("imageUrl")),
							"imageCount",
						],
					],
				},
			],
		});
		//If review cant be found return 404 code
		if (!review || review.roomId !== Number(roomId)) {
			res.status = 404;
			return res.json({
				message: "Review couldn't be found",
				statusCode: 404,
			});
		}
		//If review does not belong to the current user return 400 code
		if (review.userId !== id) {
			res.status = 400;
			return res.json({
				message: "Can only add images to your own review",
			});
		}
		//Check if the image limit has been reached
		//If it has send 400 code
		let numberOfImages = review.images[0].dataValues.imageCount;
		if (numberOfImages >= 10) {
			res.status = 400;
			return res.json({
				message:
					"Maximum number of images for this resource was reached",
				statusCode: 400,
			});
		}
		//Create a new reviewImage
		let reviewImage = await UserReviewImage.build({
			reviewId: reviewId,
			userId: id,
			imageUrl: url,
		});
		await reviewImage.save();

		res.status = 200;
		return res.json(reviewImage);
	}
);

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

	//If there is no room return 404 code
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