const express = require("express");
const { requireAuth, restoreUser } = require("../../utils/auth");
const { Booking, Room } = require("../../db/models");
const router = express.Router();

//get all of a users bookings
router.get("/", requireAuth, async (req, res) => {
	const { id } = req.user;
	//Find all bookings belonging to the user, as well as room details
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
	//If there are no bookings return 200 code and message
	if (!bookings.length) {
		res.status = 200;
		return res.json({
			message: "No bookings yet",
		});
	}

	res.status = 200;
	return res.json(bookings);
});

//Delete a booking
router.delete("/:bookingId", [restoreUser, requireAuth], async (req, res) => {
	const { bookingId } = req.params;
	//Find the booking
	let booking = await Booking.findByPk(bookingId);
	//If booking not found return 404 code and message
	if (!booking) {
		res.status = 404;
		return res.json({
			message: "Booking couldn't be found",
			statusCode: 404,
		});
	}
	//Delete booking and return success message
	booking.destroy();
	return res.json({
		message: "Successfully deleted",
		statusCode: 200,
	});
});

module.exports = router;
