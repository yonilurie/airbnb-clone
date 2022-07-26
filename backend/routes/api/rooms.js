const express = require("express");
const { requireAuth, restoreUser } = require("../../utils/auth");
const { Room, UserRoomImage } = require("../../db/models");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const router = express.Router();

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

//check if url is provided
const checkImage = [
	check("url").exists().withMessage("Must include image URL"),
	handleValidationErrors,
];

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

		res.status = 201;
		return res.json(room);
	}
);

//delete a spot
router.delete("/:roomId", [restoreUser, requireAuth], async (req, res) => {
	const { roomId } = req.params;
	console.log(req.user)
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
		const { userId } = req.user;
		let room = await Room.findOne({
			exclude: "previewImage",
			where: {
				ownerId: id,
				id: roomId,
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

//Get all of a current users owned rooms
router.get("/", [restoreUser, requireAuth], async (req, res) => {
	let userId = req.user.id;
	let rooms = await Room.findAll({
		where: { ownerId: userId },
	});

	res.status = 200;
	return res.json(rooms);
});

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
