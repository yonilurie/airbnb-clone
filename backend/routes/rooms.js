const express = require("express");
const router = express.Router();
const { Room } = require("../db/models");

//Get all spots
router.get("/", async (req, res) => {
	const Rooms = await Room.findAll({
		attributes: {
			exclude: ["numOfReviews"],
		},
	});
	res.statusCode = 200;
	res.json({
		Rooms,
	});
});

module.exports = router;
