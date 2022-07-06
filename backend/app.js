const express = require("express");
require("express-async-errors");
const morgan = require("morgan");
const cors = require("cors");
const csurf = require("csurf");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const routes = require("./routes");
const { environment } = require("./config");
const { ValidationError } = require("sequelize");

const isProduction = environment === "production";

//Initialize express application
const app = express();
//Make JSON pretty
app.set("json spaces", 2);
// Process sequelize errors
app.use((err, _req, _res, next) => {
	// check if error is a Sequelize error:
	if (err instanceof ValidationError) {
		err.errors = err.errors.map((e) => e.message);
		err.title = "Validation error";
	}
	next(err);
});

//Use middleware for logging info about requests and responses
app.use(morgan("dev"));

//Use middleware for parsing cookies and for parsing JSON bodies of req
app.use(cookieParser());
app.use(express.json());

// Security Middleware
if (!isProduction) {
	// enable cors only in development
	app.use(cors());
}

// helmet helps set a variety of headers to better secure your app
app.use(
	helmet.crossOriginResourcePolicy({
		policy: "cross-origin",
	})
);

// Set the _csrf token and create req.csrfToken method
app.use(
	csurf({
		cookie: {
			secure: isProduction,
			sameSite: isProduction && "Lax",
			httpOnly: true,
		},
	})
);

app.use(routes); // Connect all the routes

//homepage-route
app.get("/", async (_req, res) => {
	return res.json({
		message: "App Running",
	});
});

// Catch unhandled requests and forward to error handler.
app.use((_req, _res, next) => {
	const err = new Error("The requested resource couldn't be found.");
	err.title = "Resource Not Found";
	err.errors = ["The requested resource couldn't be found."];
	err.status = 404;
	next(err);
});

// Error formatter
app.use((err, _req, res, _next) => {
	res.status = err.status;
	console.error(err);
	return res.json({
		title: err.title || "Server Error",
		message: err.message,
		errors: err.errors,
		stack: isProduction ? null : err.stack,
	});
});

module.exports = app;
