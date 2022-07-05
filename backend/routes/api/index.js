const router = require("express").Router();
const sessionRouter = require("./session.js");
const usersRouter = require("./users.js");
const roomsRouter = require("./rooms");
const reviewsRouter = require("./reviews");
const { restoreUser, requireAuth } = require("../../utils/auth.js");
const { setTokenCookie } = require("../../utils/auth.js");
const { User, Room, Review, UserReviewImage } = require("../../db/models");

// Connect restoreUser middleware to the API router
// If current user session is valid, set req.user to the user in the database
// If current user session is not valid, set req.user to null
router.use(restoreUser);

//checks for authentication
router.get("/require-auth", requireAuth, (req, res) => {
	return res.json(req.user);
});

router.use("/session", sessionRouter);
router.use("/users", usersRouter);
router.use("/rooms", roomsRouter);
router.use("/reviews", reviewsRouter);

//Test route
router.post("/test", (req, res) => {
	res.json({ requestBody: req.body });
});

//Generate new token cookie
router.get("/set-token-cookie", async (_req, res) => {
	const user = await User.findOne({
		where: {
			username: "Demo-lition",
		},
	});
	setTokenCookie(res, user);
	return res.json({ user });
});

router.get("/restore-user", (req, res) => {
	return res.json(req.user);
});

module.exports = router;
