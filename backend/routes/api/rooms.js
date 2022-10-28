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
const {
	Room,
	Review,
	User,
	UserReviewImage,
	UserRoomImage,
	Booking,
	Amenity,
} = require("../../db/models");

const { requireAuth, restoreUser } = require("../../utils/auth");
const { handleValidationErrors } = require("../../utils/validation");
const amenity = require("../../db/models/amenity");

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
		// Normalize the data
		let returnBookings = {};
		bookings.forEach((booking) => {
			returnBookings[booking.id] = booking;
		});

		//Return the bookings
		res.status = 200;
		return res.json(returnBookings);
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
	const { id } = req.user;
	console.log(id);
	let rooms = await Room.findAll({
		where: { ownerId: id },
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
	//Normalize the data
	const returnRooms = {};
	rooms.forEach((room) => {
		returnRooms[room.id] = room;
	});

	res.status = 200;
	return res.json(returnRooms);
});

//Get details about a room with id
router.get("/:roomId", validateRoomId, async (req, res) => {
	let room = await Room.findByPk(req.params.roomId, {
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
				model: Amenity,
				as: "amenities",
				attributes: ["type"],
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

	//Normalize the data
	let returnRooms = {};
	rooms.forEach((room) => {
		returnRooms[room.id] = room;
	});

	res.status = 200;
	return res.json(returnRooms);
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
			guests,
			bedrooms,
			beds,
			baths,
			amenities,
		} = req.body;
		console.log(amenities);
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
			guests: guests,
			bedrooms: bedrooms,
			beds: beds,
			baths: baths,
		});

		for (let i = 1; i < gallery.length; i++) {
			let roomImages = await UserRoomImage.create({
				roomId: room.id,
				userId: req.user.id,
				imageUrl: gallery[i],
			});
		}

		amenities.forEach(async (amenity) => {
			await Amenity.create({
				roomId: room.id,
				type: amenity,
			});
		});

		res.status = 201;
		return res.json(room);
	})
);

//delete a spot
router.delete("/:roomId", [restoreUser, requireAuth], async (req, res) => {
	const { roomId } = req.params;
	const { id } = req.user;
	// Find the room
	let room = await Room.findOne({
		where: {
			id: roomId,
			ownerId: id,
		},
	});
	//If the room is not found return a 404 code
	if (!room) return res.json(noRoomError());
	// Delete the room
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
			amenities,
		} = req.body;

		//Find the room
		let room = await Room.findOne({
			exclude: "previewImage",
			where: {
				ownerId,
				id,
			},
		});
		//If room cant be found return 404 code
		if (!room) return res.json(noRoomError());
		//Update room info
		if (address) room.address = address;
		if (city) room.city = city;
		if (state) room.state = state;
		if (country) room.country = country;
		if (lat) room.lat = lat;
		if (lng) room.lng = lng;
		if (name) room.name = name;
		if (description) room.description = description;
		if (price) room.price = price;

		let currentAmenities = await Amenity.findAll({
			where: { roomId: room.id },
		});

		let amenitiesList = [];
		currentAmenities.forEach(async (amenity) => {
			if (!amenities.includes(amenity.type)) {
				await amenity.destroy();
			} else {
				amenitiesList.push(amenity.type);
			}
		});

		amenities.forEach(async (amenity) => {
			if (!amenitiesList.includes(amenity)) {
				await Amenity.create({
					roomId: room.id,
					type: amenity,
				});
			}
		});
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
