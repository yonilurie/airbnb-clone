const router = require("express").Router();
const sessionRouter = require("./session.js");
const usersRouter = require("./users.js");
const { restoreUser } = require("../../utils/auth.js");
const { setTokenCookie } = require("../../utils/auth.js");
const { User } = require("../../db/models");

// Connect restoreUser middleware to the API router
// If current user session is valid, set req.user to the user in the database
// If current user session is not valid, set req.user to null
router.use(restoreUser);

const { requireAuth } = require("../../utils/auth.js");

//checks for authentication
router.get("/require-auth", requireAuth, (req, res) => {
	return res.json(req.user);
});

router.use("/session", sessionRouter);

router.use("/users", usersRouter);

router.post("/test", (req, res) => {
	res.json({ requestBody: req.body });
});

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
