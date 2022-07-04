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
				as: 'images',
				attributes: ['imageUrl']
			}
		],
	});

	res.json(reviews);
});

module.exports = router;
