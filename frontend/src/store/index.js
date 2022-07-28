import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import sessionReducer from "./session";
import roomReducer from "./rooms";
import imagesReducer from "./roomImages";
import reviewsReducer from "./reviews";
import singleRoomReducer from "./CurrentRoom";
import myRoomReducer from "./myRooms";
import bookingsReducer from "./bookings";
import myBookingsReducer from "./myBookings";

const rootReducer = combineReducers({
	session: sessionReducer,
	rooms: roomReducer,
	roomImages: imagesReducer,
	reviews: reviewsReducer,
	currentRoom: singleRoomReducer,
	myRooms: myRoomReducer,
	bookings: bookingsReducer,
	myBookings: myBookingsReducer,
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

const configureStore = (preloadedState) => {
	return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
