const express = require("express");
const router = express.Router();
const apiRouter = require("./api");
const roomRouter = require("./rooms");
router.use("/api", apiRouter);
router.use("/rooms", roomRouter);

//Restore csrf token
router.get("/api/csrf/restore", (req, res) => {
	const csrfToken = req.csrfToken();
	res.cookie("XSRF-TOKEN", csrfToken);
	res.status(200).json({
		"XSRF-Token": csrfToken,
	});
});

module.exports = router;
