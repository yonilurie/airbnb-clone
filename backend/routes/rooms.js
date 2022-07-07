const express = require("express");
const router = express.Router();
const sequelize = require("sequelize");
const { check } = require("express-validator");
const { query } = require("express-validator/check");
const { param } = require("express-validator/check");
const { Op } = require("sequelize");
const {
	Room,
	Review,
	User,
	UserReviewImage,
	UserRoomImage,
	Booking,
} = require("../db/models");
const { restoreUser, requireAuth } = require("../utils/auth");
const { handleValidationErrors } = require("../utils/validation");

//Checks if booking has required infos
const validateBooking = [
	check("startDate")
		.exists()
		.notEmpty()
		.withMessage("Must provide a valid start date"),
	check("endDate")
		.exists()
		.notEmpty()
		.withMessage("Must provide a valid end date"),
	handleValidationErrors,
];

//Validate room params
const validateRoomId = [
	param("roomId").isNumeric().withMessage("Room id must be an integer"),
	handleValidationErrors,
];

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
		if (!reviewToEdit) {
			res.status = 404;
			return res.json({
				message: "Review not found",
			});
		}
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
//Delete and existing review
router.delete(
	"/:roomId/reviews/:reviewId",
	[validateRoomId, restoreUser, requireAuth],
	async (req, res) => {
		const { roomId, reviewId } = req.params;
		const { id } = req.user;
		//Check if room exists
		let room = await Room.findByPk(roomId);
		//If not return 404 code
		if (!room) {
			res.status = 404;
			return res.json({
				message: "Room couldn't be found",
				statusCode: 404,
			});
		}
		//Check if review exists
		let review = await Review.findByPk(reviewId);
		//If not return 404 code
		if (!review) {
			res.status = 200;
			return res.json({
				message: "Review couldn't be found",
				statusCode: 404,
			});
		}

		if (review.userId !== id) {
			return res.json({ message: "Can only edit your own comment" });
		}

		await review.destroy();
		res.status = 200;
		return res.json({
			message: "Successfully deleted",
			statusCode: 200,
		});
	}
);

//Add an image to an existing review
router.post(
	"/:roomId/reviews/:reviewId/add-image",
	[validateRoomId, restoreUser, requireAuth],
	async (req, res) => {
		const { roomId, reviewId } = req.params;
		const { id } = req.user;
		const { url } = req.body;
		let review = await Review.findByPk(reviewId);
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

		//Find all review images
		let reviewImages = await UserReviewImage.findAll({
			where: { userId: id },
		});

		//Check if the image limit has been reached
		//If it has send 400 code
		if (reviewImages.length) {
			if (reviewImages.length >= 10) {
				res.status = 400;
				return res.json({
					message:
						"Maximum number of images for this resource was reached",
					statusCode: 400,
				});
			}
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

//Get all of a rooms bookings
router.get(
	"/:roomId/bookings",
	[validateRoomId, restoreUser, requireAuth],
	async (req, res) => {
		const { roomId } = req.params;
		const { id } = req.user;
		//Find room
		let room = await Room.findByPk(roomId);
		//Check if room exists
		if (!room) {
			res.status = 404;
			return res.json({
				message: "room couldn't be found",
				statusCode: 404,
			});
		}
		//If owner
		if (id === room.ownerId) {
			//If room exists and user is owner, find the bookings and booked users info
			let bookings = await Booking.findAll({
				where: { roomId: roomId },
				// attributes: ["roomId", "startDate", "endDate"],
				include: [
					{
						model: User,
						attributes: ["id", "firstName", "lastName"],
					},
				],
			});
			//if no bookings are found
			if (!bookings.length) {
				res.status = 200;
				return res.json({ Bookings: "No dates booked!" });
			}
			//Return lsit of bookings
			res.status = 200;
			return res.json(bookings);
		}
		//If not the owner
		let bookings = await Booking.findAll({
			where: { roomId: roomId },
			attributes: ["roomId", "startDate", "endDate"],
		});
		//if no bookings are found
		if (!bookings.length) {
			res.status = 200;
			return res.json({ Bookings: "No dates booked!" });
		}
		//Return the bookings
		res.status = 200;
		return res.json(bookings);
	}
);

//Create a booking with room id
router.post(
	"/:roomId/bookings",
	[validateRoomId, restoreUser, requireAuth, validateBooking],
	async (req, res) => {
		const { roomId } = req.params;
		const { id } = req.user;
		let { startDate, endDate } = req.body;
		//Convert dates to date objects
		startDate = startDate.split("-");
		startDate[1] -= 1;
		startDate = new Date(startDate[0], startDate[1], startDate[2]);
		endDate = endDate.split("-");
		endDate[1] -= 1;
		endDate = new Date(endDate[0], endDate[1], endDate[2]);
		//check if dates are valid
		if (startDate >= endDate) {
			res.status = 403;
			return res.json({
				message: "Start date cant be after or on end date ",
			});
		}
		//Find room
		let room = await Room.findByPk(roomId);
		//Check if room exists
		if (!room) {
			res.status = 404;
			return res.json({
				message: "room couldn't be found",
				statusCode: 404,
			});
		}
		//Check if the user is the owner
		if (id === room.ownerId) {
			res.status = 403;
			return res.json({
				message: "Cannot book your own room",
			});
		}
		//Find if any bookings for the room exist within the given dates

		let bookingCheck = await Booking.findOne({
			where: {
				startDate: { [Op.gte]: startDate },
				endDate: { [Op.lte]: endDate },
			},
		});
		//If they do return error message to user with 403 code
		if (bookingCheck) {
			res.status = 403;
			return res.json({
				message:
					"Sorry, this room is already booked for the specified dates",
				statusCode: 403,
				errors: {
					startDate: "Start date conflicts with an existing booking",
					endDate: "End date conflicts with an existing booking",
				},
			});
		}
		//Create a new booking
		let newBookingData = req.body;
		newBookingData.userId = id;
		newBookingData.roomId = roomId;
		newBookingData.startDate = startDate;
		newBookingData.endDate = endDate;
		let newBooking = await Booking.create(newBookingData);
		//Return new booking to user
		res.status = 200;
		return res.json(newBooking);
	}
);

//Get all reviews of a room by id
router.get("/:roomId/reviews", validateRoomId, async (req, res) => {
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
	[validateRoomId, restoreUser, requireAuth],
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

//validate query
const checkQuery = [
	query("page")
		.optional()
		.isNumeric()
		.isInt({ min: 0 })
		.withMessage("Page must be greater than or equal to 0"),
	query("size")
		.optional()
		.isNumeric()
		.isInt({ min: 0 })
		.withMessage("Size must be greater than or equal to 0"),
	query("minLat")
		.optional()
		.isFloat({ min: -180.0, max: 180 })
		.withMessage("minLat must be a number between -180.0 and 180"),
	query("maxLat")
		.optional()
		.isFloat({ min: -180.0, max: 180 })
		.withMessage("minLat must be a number between -180.0 and 180"),
	query("minLat")
		.optional()
		.isFloat({ min: -180.0, max: 180 })
		.withMessage("minLat must be a number between -180.0 and 180"),
	query("maxLat")
		.optional()
		.isFloat({ min: -180.0, max: 180 })
		.withMessage("minLat must be a number between -180.0 and 180"),
	query("minPrice")
		.optional()
		.isFloat({ min: 1 })
		.withMessage("Minimum price must be greater than 0"),
	query("maxPrice")
		.optional()
		.isFloat({ min: 1 })
		.withMessage("Maximum price must be greater than 0"),
	handleValidationErrors,
];

//Search all rooms with optional parameters
router.get("/search", checkQuery, async (req, res) => {
	let {
		page,
		size,
		minLat,
		maxLat,
		minLng,
		maxLng,
		minPrice,
		maxPrice,
	} = req.query;
	const { Op } = require("sequelize");

	const query = {
		where: {
			lat: {
				[Op.between]: [-90, 90],
			},
			lng: { [Op.between]: [-180.0, 180.0] },
			price: { [Op.between]: [0.0, 5000.0] },
		},

		order: [["id", "ASC"]],
	};

	//Assign limit to query
	if (Number(size) === 0 || !size) size = 20;
	if (!size || !(size <= 20)) query.limit = 20;
	else query.limit = size;
	//Assign offset to query
	if (Number(page) === 0 || !page) page = 1;
	if (page && page >= 1) query.offset = (page - 1) * size;
	else query.offset = 0;
	//So page number corresponds on JSON response

	if (minLat) query.where.lat[Op.between][0] = minLat;
	if (maxLat) query.where.lat[Op.between][1] = maxLat;
	if (minLng) query.where.lng[Op.between][0] = minLng;
	if (maxLng) query.where.lng[Op.between][1] = maxLng;
	if (minPrice) query.where.price[Op.between][0] = minPrice;
	if (maxPrice) query.where.price[Op.between][1] = maxPrice;

	const rooms = await Room.findAll(query);

	res.status = 200;
	return res.json({
		rooms,
		page: Number(page),
		size: Number(query.limit),
	});
});

//Get details about a room with id
router.get("/:roomId", validateRoomId, async (req, res) => {
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
		],
	});

	//If there is no room return 404 code
	if (!room) {
		res.status = 404;
		return res.json({
			message: "Spot couldn't be found",
			statusCode: 404,
		});
	}

	let reviewInfo = await Review.findAll({
		where: { roomId: req.params.roomId },
		attributes: [
			[sequelize.fn("COUNT", sequelize.col("roomId")), "numReviews"],
			[sequelize.fn("AVG", sequelize.col("stars")), "avgStarRating"],
		],
	});
	let avg = reviewInfo[0].dataValues.avgStarRating;
	let numReviews = reviewInfo[0].dataValues.numReviews;
	room.dataValues.avgStarRating = avg;
	room.dataValues.numReviews = numReviews;
	res.status = 200;
	return res.json(room);
});

//Get all Rooms
router.get("/", async (req, res) => {
	const rooms = await Room.findAll({});

	res.status = 200;
	return res.json({ rooms });
});

module.exports = router;
