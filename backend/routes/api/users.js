const express = require("express");
const asyncHandler = require("express-async-handler");
const { setTokenCookie } = require("../../utils/auth");
const { User } = require("../../db/models");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const { singlePublicFileUpload, singleMulterUpload } = require("../../awsS3");
const router = express.Router();

const validateSignup = [
	check("email")
		.exists({ checkFalsy: true })
		.isEmail()
		.withMessage("Please provide a valid email."),
	check("username")
		.exists({ checkFalsy: true })
		.isLength({ min: 4 })
		.withMessage("Please provide a username with at least 4 characters."),
	check("username")
		.exists({ checkFalsy: true })
		.not()
		.isEmail()
		.withMessage("Username cannot be an email."),
	check("firstName")
		.exists({ checkFalsy: true })
		.isAlpha()
		.withMessage("Please provide a first name"),
	check("lastName")
		.exists({ checkFalsy: true })
		.isAlpha()
		.withMessage("Please provide a last name"),
	check("password")
		.exists({ checkFalsy: true })
		.isLength({ min: 6 })
		.withMessage("Password must be 6 characters or more."),
	handleValidationErrors,
];

// Post /api/users ---Sign up
router.post(
	"/",
	singleMulterUpload("image"),
	validateSignup,
	asyncHandler(async (req, res) => {
		const { email, password, username, lastName, firstName } = req.body;
		const profileImageUrl = await singlePublicFileUpload(req.file);
		const user = await User.signup({
			username,
			email,
			password,
			profileImageUrl,
			lastName,
			firstName,
		});

		setTokenCookie(res, user);

		return res.json({
			user,
		});
	})
);

// Sign up
router.post("/register", validateSignup, async (req, res) => {
	const { email, password, username, firstName, lastName } = req.body;
	//Check if any accounts with the provided emai; exist
	const emailCheck = await User.findAll({ where: { email: email } });
	if (emailCheck.length) {
		const err = {};
		err.message = "User already exists";
		err.status = 403;
		err.errors = {
			email: "User with that email already exists",
		};
		return res.json(err);
	}

	const usernameCheck = await User.findAll({
		where: { username: username },
	});
	if (usernameCheck.length) {
		const err = {};
		err.message = "User already exists";
		err.status = 403;
		err.errors = {
			email: "User with that username already exists",
		};
		return res.json(err);
	}

	const user = await User.signup({
		email,
		username,
		firstName,
		lastName,
		password,
	});

	await setTokenCookie(res, user);
	const token = req.cookies.token;
	return res.json({
		user,
		token,
	});
});

module.exports = router;
