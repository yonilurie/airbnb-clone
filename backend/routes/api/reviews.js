const express = require("express");

const { requireAuth, restoreUser } = require("../../utils/auth");
const { Room, User, Review, UserReviewImage } = require("../../db/models");
const router = express.Router();

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

		await image.destroy()
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
