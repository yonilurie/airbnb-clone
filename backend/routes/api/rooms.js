const express = require("express");
const router = express.Router();
const {
	multiplePublicFileUpload,
	multipleMulterUpload,
} = require("../../awsS3");
const asyncHandler = require("express-async-handler");
const sequelize = require("sequelize");
const { check } = require("express-validator");
const { query } = require("express-validator");
const { param } = require("express-validator");
const { Op } = require("sequelize");
const {
	Room,
	Review,
	User,
	UserReviewImage,
	UserRoomImage,
	Booking,
} = require("../../db/models");

const { requireAuth, restoreUser } = require("../../utils/auth");
const { handleValidationErrors } = require("../../utils/validation");

//----------------- Validations

//Validate that a newly POSTed room has all required information
const validateRoom = [
	check("address")
		.exists({ checkFalsy: true })
		.notEmpty()
		.withMessage("Street address is required"),
	check("city")
		.exists({ checkFalsy: true })
		.notEmpty()
		.withMessage("City is required"),
	check("state")
		.exists({ checkFalsy: true })
		.notEmpty()
		.withMessage("State is required"),
	check("country")
		.exists({ checkFalsy: true })
		.notEmpty()
		.withMessage("Country is required"),
	check("lat").notEmpty().withMessage("Latitude is not valid"),
	check("lng").notEmpty().withMessage("Longitude is not valid"),
	check("name")
		.exists({ checkFalsy: true })
		.notEmpty()
		.isLength({ max: 50 })
		.withMessage("Name must be less than 50 characters"),
	check("description")
		.exists({ checkFalsy: true })
		.notEmpty()
		.isLength({ max: 500 })
		.withMessage("Description is required"),
	check("price")
		.exists({ checkFalsy: true })
		.notEmpty()
		.withMessage("Price per day is required"),
	handleValidationErrors,
];

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

//Validate review params
const validateReview = [
	check("review")
		.exists()
		.withMessage("Must include review message")
		.notEmpty()
		.withMessage("Review can not be empty"),

	check("stars")
		.exists()
		.withMessage("Must include stars rating")
		.notEmpty()
		.withMessage("Rating cannot be empty")
		.isInt({ min: 1, max: 5 })
		.withMessage("Must be between 1 and 5 stars"),

	handleValidationErrors,
];

//check if url is provided
const checkImage = [
	check("url").exists().withMessage("Must include image URL"),
	handleValidationErrors,
];

//validate query
const checkQuery = [
	query("page")
		.optional()
		.isNumeric()
		.withMessage("Must be a number")
		.isInt({ min: 0 })
		.withMessage("Page must be greater than or equal to 0"),
	query("size")
		.optional()
		.isNumeric()
		.withMessage("Must be a number")
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

//Edit an existing review
router.put(
	"/:roomId/reviews/:reviewId",
	[validateRoomId, validateReview, restoreUser, requireAuth],
	async (req, res) => {
		const { roomId, reviewId } = req.params;
		const { id } = req.user;
		const { review, stars } = req.body;

		//Check if a room with that ID exists
		let room = await Room.findByPk(roomId);

		//Check if room exists
		if (!room) return res.json(noRoomError());
		//Find review that needs editing
		let reviewToEdit = await Review.findByPk(reviewId, {
			include: [
				{
					model: User,
					attributes: ["id", "firstName", "lastName"],
				},
			],
		});
		//if it doesnt exist or belongs to the wrong room
		if (!reviewToEdit || reviewToEdit.roomId !== Number(roomId)) {
			return res.json(noRoomError());
		}

		if (reviewToEdit.userId !== Number(id)) {
			return res.json(noReviewError());
		}

		reviewToEdit.review = review;
		reviewToEdit.stars = stars;
		await reviewToEdit.save();

		res.status = 200;
		return res.json(reviewToEdit);
	}
);

//Delete an existing review
router.delete(
	"/:roomId/reviews/:reviewId",
	[validateRoomId, restoreUser, requireAuth],
	async (req, res) => {
		const { roomId, reviewId } = req.params;
		const { id } = req.user;
		//Check if room exists
		let room = await Room.findByPk(roomId);
		//Check if room exists
		if (!room) return res.json(noRoomError());
		//Check if review exists
		let review = await Review.findByPk(reviewId);
		//If not return 404 code
		if (
			!review ||
			review.userId !== Number(id) ||
			review.roomId !== Number(roomId)
		) {
			return res.json(noReviewError());
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
		if (
			!review ||
			review.roomId !== Number(roomId) ||
			review.userId !== id
		) {
			return res.json(noReviewError());
		}

		//Find all review images
		let reviewImages = await UserReviewImage.findAll({
			where: { userId: id },
		});

		//Check if the image limit has been reached
		//If it has send 400 code
		if (reviewImages.length && reviewImages.length >= 10) {
			const err = {};
			(err.message = "Max images"), (err.status = 404);
			err.errors = {
				error: "Maximum number of images for this resource was reached",
				statusCode: 404,
			};
			return res.json(err);
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
	// [validateRoomId, restoreUser, requireAuth],
	async (req, res) => {
		const { roomId } = req.params;
		// const { id } = req.user;
		//Find room
		let room = await Room.findByPk(roomId);
		//Check if room exists
		if (!room) return res.json(noRoomError());

		//If owner
		// if (id === room.ownerId) {
		// 	//If room exists and user is owner, find the bookings and booked users info
		// 	let bookings = await Booking.findAll({
		// 		where: { roomId: roomId },
		// 		// attributes: ["roomId", "startDate", "endDate"],
		// 		include: [
		// 			{
		// 				model: User,
		// 				attributes: ["id", "firstName", "lastName"],
		// 			},
		// 		],
		// 	});
		// 	//if no bookings are found
		// 	if (!bookings.length) {
		// 		res.status = 200;
		// 		return res.json({ Bookings: "No dates booked!" });
		// 	}
		// 	//Return lsit of bookings
		// 	res.status = 200;
		// 	return res.json(bookings);
		// }
		//If not the owner
		let bookings = await Booking.findAll({
			where: { roomId: roomId },
			attributes: ["id", "roomId", "startDate", "endDate"],
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
		if (startDate >= endDate) {
			res.status = 403;
			return res.json({
				message: "Start date cant be after or on end date ",
			});
		}
		//Find room
		let room = await Room.findByPk(roomId);
		//Check if room exists
		if (!room) return res.json(noRoomError());
		//Check if the user is the owner
		if (id === room.ownerId) {
			const err = {};
			(err.message = "Cannot book your own room"), (err.status = 403);
			err.errors = {
				error: "Cannot book your own room",
				statusCode: 403,
			};
			return res.json(err);
		}
		//Find if any bookings for the room exist within the given dates

		let bookingCheck = await Booking.findOne({
			where: {
				startDate: { [Op.gte]: startDate },
				endDate: { [Op.lte]: endDate },
				roomId: {
					[Op.eq]: roomId,
				},
			},
		});
		//If they do return error message to user with 403 code

		if (bookingCheck) {
			const err = {};
			// err.booking =  {
			// 	startDate: checkAvailability.startDate,
			// 	endDate: checkAvailability.endDate
			// }
			(err.message =
				"Sorry, this room is already booked for the specified dates"),
				(err.status = 403);
			err.errors = {
				error:
					"Sorry, this room is already booked for the specified dates",
				statusCode: 403,
			};
			return res.json(err);
			// errors: {
			// 	startDate: "Start date conflicts with an existing booking",
			// 	endDate: "End date conflicts with an existing booking",
			// }
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
	if (!reviews.length) return res.json(noRoomError());

	res.status = 200;
	return res.json(reviews);
});

//add a review to a room
router.post(
	"/:roomId/reviews",
	[validateRoomId, validateReview, restoreUser, requireAuth],
	async (req, res) => {
		const { roomId } = req.params;
		const { review, stars } = req.body;

		const { id } = req.user;

		//Check if a room with that ID exists
		let room = await Room.findByPk(roomId);
		//Check if room exists
		if (!room) return res.json(noRoomError());
		//If it does but it is owned by the reviewer, return a 403 code
		if (room.ownerId === id) {
			const err = {};
			(err.message = "You cannot leave a review for your own listing"),
				(err.status = 403);
			err.errors = {
				error: "You cannot leave a review for your own listing",
				statusCode: 403,
			};
			return res.json(err);
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
			const err = {};
			(err.message = "User already has a review for this spot"),
				(err.status = 403);
			err.errors = {
				error: "User already has a review for this spot",
				statusCode: 403,
			};
			return res.json(err);
		}

		let returnReview = await Review.findByPk(newReview.id, {
			include: [
				{
					model: User,
					as: "guest",
				},
			],
		});

		res.status = 200;
		return res.json(returnReview);
	}
);

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
			lat: { [Op.between]: [-90, 90] },
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

	//Find the room
	const rooms = await Room.findAll(query);

	res.status = 200;
	return res.json({
		rooms,
		page: Number(page),
		size: Number(query.limit),
	});
});

//Get all of a current users owned rooms
router.get("/my-rooms", [restoreUser, requireAuth], async (req, res) => {
	let userId = req.user.id;
	let rooms = await Room.findAll({
		where: { ownerId: userId },
	});

	for (let i = 0; i < rooms.length; i++) {
		let reviewInfo = await Review.findAll({
			where: { roomId: rooms[i].id },
			attributes: [
				[sequelize.fn("COUNT", sequelize.col("roomId")), "numReviews"],
				[sequelize.fn("AVG", sequelize.col("stars")), "avgStarRating"],
			],
		});
		const avg = reviewInfo[0].dataValues.avgStarRating;
		rooms[i].dataValues.avgStarRating = avg;
	}

	res.status = 200;
	return res.json(rooms);
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
			"previewImage",
			"createdAt",
			"updatedAt",
			"rules",
		],
		include: [
			{
				model: UserRoomImage,
				as: "images",
				attributes: ["imageUrl"],
			},
			{
				model: User,
				as: "owner",
				attributes: ["id", "firstName", "lastName"],
			},
			{
				model: Review,
				as: "reviews",
				include: [
					{
						model: User,
						as: "guest",
						attributes: ["id", "firstName", "lastName"],
					},
				],
			},
		],
	});

	//Check if room exists
	if (!room) return res.json(noRoomError());
	//Get the number of reviews and avg star rating
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
	const rooms = await Room.findAll({
		attributes: [
			"id",
			"city",
			"state",
			"country",
			"lat",
			"lng",
			"name",
			"description",
			"price",
			"previewImage",
		],
	});

	for (let i = 0; i < rooms.length; i++) {
		let reviewInfo = await Review.findAll({
			where: { roomId: rooms[i].id },
			attributes: [
				[sequelize.fn("COUNT", sequelize.col("roomId")), "numReviews"],
				[sequelize.fn("AVG", sequelize.col("stars")), "avgStarRating"],
			],
		});
		const avg = reviewInfo[0].dataValues.avgStarRating;
		const numReviews = reviewInfo[0].dataValues.numReviews;
		rooms[i].dataValues.avgStarRating = avg;
		rooms[i].dataValues.numReviews = numReviews;
	}

	res.status = 200;
	return res.json(rooms);
});

//Delete room image
router.delete(
	"/images/:imageId",
	[restoreUser, requireAuth],
	async (req, res) => {
		const { imageId } = req.params;
		const { id } = req.user;

		let image = await UserRoomImage.findByPk(imageId);
		//Check if image exists or is not the users
		if (!image || image.userId !== id) {
			return res.json(noImageError());
		}

		await image.destroy();
		res.status = 200;
		return res.json({
			message: "Successfully deleted",
			statusCode: 200,
		});
	}
);

//Add a room if you are a user
router.post(
	"/add",
	multipleMulterUpload("images"),
	[restoreUser, requireAuth, validateRoom],
	asyncHandler(async (req, res) => {
		const {
			address,
			city,
			state,
			country,
			lat,
			lng,
			name,
			description,
			price,
		} = req.body;

		const gallery = await multiplePublicFileUpload(req.files);
		let room = await Room.create({
			ownerId: req.user.id,
			address: address,
			city: city,
			state: state,
			country: country,
			lat: lat,
			lng: lng,
			name: name,
			description: description,
			price: price,
			previewImage: gallery[0],
			rules: "No Smoking&",
		});
		for (let i = 1; i < gallery.length; i++) {
			let roomImages = await UserRoomImage.create({
				roomId: room.id,
				userId: req.user.id,
				imageUrl: gallery[i],
			});
		}

		res.status = 201;
		return res.json(room);
	})
);

//delete a spot
router.delete("/:roomId", [restoreUser, requireAuth], async (req, res) => {
	const { roomId } = req.params;

	const { id } = req.user;
	let room = await Room.findOne({
		where: {
			id: roomId,
			ownerId: id,
		},
	});

	//If the room is not found return a 404 code
	if (!room) return res.json(noRoomError());

	await room.destroy();

	res.status = 200;
	return res.json({
		message: "Successfully deleted",
		statusCode: 200,
	});
});

//Edit a spot
router.put(
	"/:roomId",
	[restoreUser, requireAuth, validateRoom],
	async (req, res) => {
		const { roomId } = req.params;
		const ownerId = req.user.id;
		const {
			address,
			city,
			state,
			country,
			lat,
			lng,
			name,
			description,
			price,
			id,
		} = req.body;
		const { userId } = req.user;
		let room = await Room.findOne({
			exclude: "previewImage",
			where: {
				ownerId,
				id,
			},
		});

		//If room cant be found return 404 code
		if (!room) return res.json(noRoomError());

		if (address) room.address = address;
		if (city) room.city = city;
		if (state) room.state = state;
		if (country) room.country = country;
		if (lat) room.lat = lat;
		if (lng) room.lng = lng;
		if (name) room.name = name;
		if (description) room.description = description;
		if (price) room.price = price;
		await room.save();

		res.status = 200;
		return res.json(room);
	}
);

//Add an image to an owned room
router.post(
	"/:roomId",
	[restoreUser, requireAuth, checkImage],
	async (req, res) => {
		const { url } = req.body;
		const { roomId } = req.params;
		const { id } = req.user;
		//Check if room exists
		let room = await Room.findOne({
			where: { ownerId: id, id: roomId },
		});
		//If not return 404 code
		if (!room) return res.json(noRoomError());
		//create new User room image
		let newImage = await UserRoomImage.build({
			imageUrl: url,
			userId: id,
			roomId: roomId,
		});

		await newImage.save();

		res.status = 200;
		return res.json(newImage);
	}
);

//------------- Functions

//Error for no Room being found
function noRoomError() {
	const err = {};
	(err.message = "Room couldn't be found"), (err.status = 404);
	err.errors = {
		error: "Room couldn't be found",
		statusCode: 404,
	};
	return err;
}

function noImageError() {
	const err = {};
	(err.message = "Image couldn't be found"), (err.status = 404);
	err.errors = {
		error: "Image couldn't be found",
		statusCode: 404,
	};
	return err;
}

module.exports = router;
