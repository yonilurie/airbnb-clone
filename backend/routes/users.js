const express = require("express");
const router = express.Router();
const { User, Room } = require("../db/models");

router.get("/:userId/rooms", async (req, res) => {
	let Rooms = await Room.findAll({
		where: { ownerId: req.params.userId },
		attributes: { exclude: ["numOfReviews"] },
	});
	res.statusCode = 200;

	if (!Rooms.length) {
		res.json({
			Rooms: "No properties found.",
		});
	}

	res.json(Rooms);
});

module.exports = router;
