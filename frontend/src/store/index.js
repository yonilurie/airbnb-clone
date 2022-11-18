import {combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { configureStore } from "@reduxjs/toolkit";
import sessionReducer from "./session";
import roomReducer from "./rooms";
import logger from "redux-logger";

import singleRoomReducer from "./CurrentRoom";

const rootReducer = combineReducers({
	session: sessionReducer,
	rooms: roomReducer,
	currentRoom: singleRoomReducer,
});

let enhancer;

if (process.env.NODE_ENV === "production") {
	enhancer = applyMiddleware(thunk);
} else {
	const logger = require("redux-logger").default;
	const composeEnhancers =
		window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
	enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
	devTools: process.env.NODE_ENV !== "production",
});

export default store;
