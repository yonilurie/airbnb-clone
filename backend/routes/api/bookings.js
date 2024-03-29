const express = require("express");
const router = express.Router();
const { requireAuth, restoreUser } = require("../../utils/auth");
const { handleValidationErrors } = require("../../utils/validation");
const { Booking, Room, User, Review } = require("../../db/models");
const { check } = require("express-validator");
const { param } = require("express-validator");
const { Op } = require("sequelize");

//Checks if booking has required infos
const validateBooking = [
	check("startDate")
		.exists()
		.notEmpty()
		.withMessage("Must provide start date"),
	check("endDate").exists().notEmpty().withMessage("Must provide end date"),
];

//Validate booking params
const validateBookingId = [
	param("bookingId").isNumeric().withMessage("Booking id must be an integer"),
	handleValidationErrors,
];

//Validate room params
const validateRoomId = [
	param("roomId").isNumeric().withMessage("Room id must be an integer"),
	handleValidationErrors,
];

//Create a booking with room id
router.post(
	"/:roomId",
	[validateRoomId, restoreUser, requireAuth, validateBooking],
	async (req, res) => {
		const { roomId } = req.params;
		const { id } = req.user;
		let { startDate, endDate } = req.body;
		//Make sure start date if after end date
		if (startDate >= endDate) {
			res.status = 403;
			return res.json({
				message: "Start date cant be after or on end date ",
			});
		}
		//Find room
		let room = await Room.findByPk(roomId);
		//Check if room exists
		if (!room) return res.json(noRoomError());
		//Check if the user is the owner
		if (id === room.ownerId) {
			const err = {};
			(err.message = "Cannot book your own room"), (err.status = 403);
			err.errors = {
				error: "Cannot book your own room",
				statusCode: 403,
			};
			return res.json(err);
		}
		//Find if any bookings for the room exist within the given dates
		let bookingCheck = await Booking.findOne({
			where: {
				startDate: { [Op.gte]: startDate },
				endDate: { [Op.lte]: endDate },
				roomId: {
					[Op.eq]: roomId,
				},
			},
		});
		//If they do return error message to user with 403 code
		if (bookingCheck) {
			const err = {};
			(err.message =
				"Sorry, this room is already booked for the specified dates"),
				(err.status = 403);
			err.errors = {
				error:
					"Sorry, this room is already booked for the specified dates",
				statusCode: 403,
			};
			return res.json(err);
		}
		//Create a new booking
		let newBookingData = req.body;
		newBookingData.userId = id;
		newBookingData.roomId = roomId;
		newBookingData.startDate = startDate;
		newBookingData.endDate = endDate;
		let newBooking = await Booking.create(newBookingData);
		//Return new booking to user
		res.status = 200;
		return res.json(newBooking);
	}
);

//Edit a booking
router.put(
	"/:bookingId",
	[validateBookingId, validateBooking, restoreUser, requireAuth],
	async (req, res) => {
		const { bookingId } = req.params;
		const { id } = req.user;
		let { startDate, endDate, roomId } = req.body;
		//check if dates are valid
		if (startDate >= endDate) {
			res.status = 403;
			return res.json({
				message: "Start date cant be after or on end date ",
			});
		}
		//Check if the booking exists
		let existingBooking = await Booking.findByPk(bookingId);
		if (!existingBooking || existingBooking.userId !== id) {
			return res.json(noBookingError());
		}
		//Create current time object
		let now = new Date();
		let currentTime = new Date(
			now.getFullYear(),
			now.getMonth(),
			now.getDate()
		);
		//Check if booking the user want to edit has already passed
		if (
			currentTime >= existingBooking.startDate ||
			currentTime >= startDate
		) {
			res.status = 400;
			return res.json({
				message: "Past bookings can't be modified",
				statusCode: 400,
			});
		}
		//Check if any booking occur in between the given start and end times
		let checkAvailability = await Booking.findOne({
			where: {
				startDate: { [Op.gte]: startDate },
				endDate: { [Op.lte]: endDate },
				roomId: {
					[Op.eq]: roomId,
				},
				id: {
					[Op.ne]: bookingId,
				},
			},
		});
		//if room is not available return error with 403 code
		if (checkAvailability) {
			res.status = 403;
			return res.json({
				message:
					"Sorry, this room is already booked for the specified dates",
				statusCode: 403,
				errors: {
					error:
						"Sorry, this room is already booked for the specified dates",
				},
			});
		}

		existingBooking.startDate = startDate;
		existingBooking.endDate = endDate;
		await existingBooking.save();
		return res.json(existingBooking);
	}
);

//Delete a booking
router.delete(
	"/:bookingId",
	[validateBookingId, restoreUser, requireAuth],
	async (req, res) => {
		const { bookingId } = req.params;
		const { id } = req.user;
		//Find the booking
		let booking = await Booking.findByPk(bookingId);
		//If booking not found return 404 code and message
		if (!booking || booking.userId !== id) {
			return res.json(noBookingError());
		}
		//Delete booking and return success message
		booking.destroy();
		return res.json({
			message: "Successfully deleted",
			statusCode: 200,
		});
	}
);

//get all of a users bookings
router.get("/", [restoreUser, requireAuth], async (req, res) => {
	const { id } = req.user;
	//Find all bookings belonging to the user, as well as room details
	let bookings = await Booking.findAll({
		where: { userId: id },
		attributes: [
			"createdAt",
			"updatedAt",
			"startDate",
			"endDate",
			"guests",
			"id",
			"roomId",
			"userId",
		],
		include: [
			{
				model: Room,
				as: "room",
				include: [
					{
						model: User,
						as: "owner",
						attributes: ["firstName", "description"],
					},
					{
						model: Booking,
						as: "bookings",
					},
					{
						model: Review,
						as: "reviews",
					},
				],
			},
		],
	});
	//If there are no bookings return 200 code and message
	if (!bookings.length) {
		res.status = 200;
		return res.json({
			pastBookings: {},
			currentBookings: {},
			futureBookings: {},
		});
	}
	// Normalize booking data and seperate into past current and future
	let pastBookings = {};
	let futureBookings = {};
	let currentBookings = {};
	if (bookings.length && bookings[0] !== "No bookings yet") {
		bookings.forEach((booking) => {
			let now = new Date().getTime();
			let start = new Date(booking.startDate);
			let end = new Date(booking.endDate);

			if (start.getTime() < now && end.getTime() > now) {
				return (currentBookings[booking.id] = booking);
			}
			if (start.getTime() < now) {
				return (pastBookings[booking.id] = booking);
			}
			if (start.getTime() > now) {
				return (futureBookings[booking.id] = booking);
			}
		});
	}

	res.status = 200;
	return res.json({
		pastBookings,
		currentBookings,
		futureBookings,
	});
});

//-------------- Functions

function noBookingError() {
	const err = {};
	(err.message = "Booking couldn't be found"), (err.status = 404);
	err.errors = {
		error: "Booking couldn't be found",
		statusCode: 404,
	};
	return err;
}
module.exports = router;
