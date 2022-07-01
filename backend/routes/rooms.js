const express = require("express");
const router = express.Router();
const { Room } = require("../db/models");
router.get("/", async (req, res) => {
	const allRooms = await Room.findAll();
	res.statusCode = 200;
	res.json(allRooms);
});

module.exports = router;
