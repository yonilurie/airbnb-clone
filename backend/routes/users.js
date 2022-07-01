const express = require("express");
const { ResultWithContext } = require("express-validator/src/chain");
const router = express.Router();
const { User, Room } = require("../db/models");
const user = require("../db/models/user");
const {
	requireAuth,
	restoreUser,
	checkSpecificUser,
} = require("../utils/auth");

router.get(
	"/:userId/rooms",
	[restoreUser, checkSpecificUser],
	async (req, res, next) => {
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
	}
);

module.exports = router;
