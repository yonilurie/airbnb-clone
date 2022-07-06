const express = require("express");
const { requireAuth } = require("../../utils/auth");
const { Booking, Room } = require("../../db/models");
const router = express.Router();

//get all of a users bookings
router.get("/", requireAuth, async (req, res) => {
	const { id } = req.user;

	let bookings = await Booking.findAll({
		where: { userId: id },
		include: {
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
				"previewImage",
			],
		},
	});
	if (!bookings.length) {
		res.status = 200;
		return res.json({
			message: "No bookings yet",
		});
	}

	res.status = 200;
	res.json(bookings);
});

module.exports = router;
