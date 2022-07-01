const express = require("express");
const router = express.Router();

const apiRouter = require("./api");
const roomRouter = require("./rooms");
const userRouter = require("./users");
router.use("/api", apiRouter);
router.use("/rooms", roomRouter);
router.use("/users", userRouter);

router.get("/api/csrf/restore", (req, res) => {
	const csrfToken = req.csrfToken();
	res.cookie("XSRF-TOKEN", csrfToken);
	res.status(200).json({
		"XSRF-Token": csrfToken,
	});
});

module.exports = router;
