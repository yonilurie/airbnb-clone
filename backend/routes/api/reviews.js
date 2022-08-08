const express = require("express");
const { requireAuth, restoreUser } = require("../../utils/auth");
const { handleValidationErrors } = require("../../utils/validation");
const { Room, User, Review, UserReviewImage } = require("../../db/models");
const { check } = require("express-validator");
const Sequelize = require("sequelize");
const router = express.Router();

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

router.delete("/:reviewId", [restoreUser, requireAuth], async (req, res) => {
	const { reviewId } = req.params;

	const { id } = req.user;

	//Check if review exists
	let review = await Review.findByPk(reviewId);
	//If not return 404 code
	if (!review || review.userId !== Number(id)) {
		return res.json(noReviewError());
	}

	await review.destroy();
	res.status = 200;
	return res.json({
		message: "Successfully deleted",
		statusCode: 200,
	});
});

//Edit an existing review
router.put(
	"/:reviewId",
	[validateReview, restoreUser, requireAuth],
	async (req, res) => {
		const { reviewId } = req.params;
		const { id } = req.user;
		const { review, stars } = req.body;

		let reviewToEdit = await Review.findByPk(reviewId, {
			include: [
				{
					model: User,
					attributes: ["id", "firstName", "lastName"],
				},
			],
		});

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

//Delete review image
router.delete(
	"/images/:imageId",
	[restoreUser, requireAuth],
	async (req, res) => {
		const { imageId } = req.params;
		const { id } = req.user;

		let image = await UserReviewImage.findByPk(imageId);
		//Check if image exists or is not the users
		if (!image || image.userId !== id) {
			res.status = 404;
			return res.json({
				message: "Image couldn't be found",
				statusCode: 404,
			});
		}

		await image.destroy();
		res.status = 200;
		return res.json({
			message: "Successfully deleted",
			statusCode: 200,
		});
	}
);

//Get all of a current users posted reviews
router.get("/", [restoreUser, requireAuth], async (req, res) => {
	let { id } = req.user;
	let reviews = await Review.findAll({
		where: { userId: id },
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
				as: "guest",
				attributes: ["id", "firstName", "lastName"],
			},
			{
				model: Room,
				as:'room',
				attributes: ["id", "ownerId"],
			},
			{
				model: UserReviewImage,
				as: "images",
				attributes: ["imageUrl"],
			},
		],
	});

	return res.json(reviews);
});

function noRoomError() {
	const err = {};
	(err.message = "Room couldn't be found"), (err.status = 404);
	err.errors = {
		error: "Room couldn't be found",
		statusCode: 404,
	};
	return err;
}
module.exports = router;
