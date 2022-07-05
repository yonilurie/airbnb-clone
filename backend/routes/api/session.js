const express = require("express");

const {
	setTokenCookie,
	restoreUser,
	requireAuth,
} = require("../../utils/auth");
const { User, Room, Review, UserReviewImage } = require("../../db/models");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const router = express.Router();

const validateLogin = [
	check("credential")
		.exists({ checkFalsy: true })
		.notEmpty()
		.withMessage("Please provide a valid email or username."),
	check("password")
		.exists({ checkFalsy: true })
		.withMessage("Please provide a password."),
	handleValidationErrors,
];

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

// Log in
router.post("/", validateLogin, async (req, res, next) => {
	const { credential, password } = req.body;

	const user = await User.login({ credential, password });

	if (!user) {
		const err = new Error("Login failed");
		err.status = 401;
		err.title = "Login failed";
		err.errors = ["The provided credentials were invalid."];
		return next(err);
	}

	await setTokenCookie(res, user);

	return res.json({
		user,
	});
});

// Log out
router.delete("/", (_req, res) => {
	res.clearCookie("token");
	return res.json({ message: "success" });
});

// Restore session user
router.get("/", restoreUser, (req, res) => {
	const { user } = req;
	if (user) {
		return res.json({
			user: user.toSafeObject(),
		});
	} else return res.json({});
});

router.get("/rooms", requireAuth, async (req, res) => {
	let userId = req.user.id;
	let Rooms = await Room.findAll({
		where: { ownerId: userId },
	});
	res.status = 200;
	res.json(Rooms);
});

router.get("/reviews", requireAuth, async (req, res) => {
	let userId = req.user.id;
	let reviews = await Review.findAll({
		where: { userId: userId },
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
				model: Room,
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
					"price",
				],
			},
			{
				model: UserReviewImage,
				as: "images",
				attributes: ["imageUrl"],
			},
		],
	});

	res.json(reviews);
});

router.post(
	"/rooms/add",
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
		res.json(room);
	}
);


router.put()

module.exports = router;
