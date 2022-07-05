const express = require("express");

const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { Room, User, Review, UserReviewImage } = require("../../db/models");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const router = express.Router();

//Get all of a current users posted reviews
router.get("/", requireAuth, async (req, res) => {
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

	return res.json(reviews);
});

module.exports = router;
