const express = require("express");
const { requireAuth, restoreUser } = require("../../utils/auth");
const { Room } = require("../../db/models");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const router = express.Router();

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
	check("lat")
		.exists({ checkFalsy: true })
		.notEmpty()
		.withMessage("Latitude is not valid"),
	check("lng")
		.exists({ checkFalsy: true })
		.notEmpty()
		.withMessage("Longitude is not valid"),
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

//Add a room if you are a user
router.post(
	"/add",
	[restoreUser, requireAuth, validateRoom],
	async (req, res) => {
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
			previewImage,
		} = req.body;
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
			previewImage: previewImage,
		});

		//If  room was not created return 400 code
		if (!room) {
			res.status = 400;
			res.body({
				message: "Validation Error",
				statusCode: 400,
				errors: {
					address: "Street address is required",
					city: "City is required",
					state: "State is required",
					country: "Country is required",
					lat: "Latitude is not valid",
					lng: "Longitude is not valid",
					name: "Name must be less than 50 characters",
					description: "Description is required",
					price: "Price per day is required",
				},
			});
		}
		res.status = 201;
		return res.json(room);
	}
);

//delete a spot
router.delete("/:roomId", requireAuth, async (req, res) => {
	const { roomId } = req.params;
	const { id } = req.user;
	let room = await Room.findOne({
		where: {
			id: roomId,
			ownerId: id,
		},
	});

	//If the room is not found return a 404 code
	if (!room) {
		res.status = 404;
		res.json({
			message: "Spot couldn't be found",
			statusCode: 404,
		});
	}

	await room.destroy();

	res.status = 200;
	res.json({
		message: "Successfully deleted",
		statusCode: 200,
	});
});

//Edit a spot
router.put("/:roomId", [requireAuth, validateRoom], async (req, res) => {
	const { roomId } = req.params;
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
	let userId = req.user.id;
	let room = await Room.findOne({
		exclude: "previewImage",
		where: {
			ownerId: userId,
			id: roomId,
		},
	});

	//If room cant be found return 404 code
	if (!room) {
		res.status = 400;
		res.json({
			message: "Spot couldn't be found",
			statusCode: 404,
		});
	}

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
	res.json(room);
});

//Get all of a current users owned rooms
router.get("/", requireAuth, async (req, res) => {
	let userId = req.user.id;
	let rooms = await Room.findAll({
		where: { ownerId: userId },
	});

	res.status = 200;
	return res.json(rooms);
});

module.exports = router;
