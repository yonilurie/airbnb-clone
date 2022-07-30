import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import sessionReducer from "./session";
import roomReducer from "./rooms";
import imagesReducer from "./roomImages";
// import reviewsReducer from "./reviews";
import singleRoomReducer from "./CurrentRoom";
import myRoomReducer from "./myRooms";
import bookingsReducer from "./bookings";
import myBookingsReducer from "./myBookings";
import myReviewsReducer from "./myReviews";

const rootReducer = combineReducers({
	session: sessionReducer,
	rooms: roomReducer,
	currentRoom: singleRoomReducer,
	myRooms: myRoomReducer,
	
	myBookings: myBookingsReducer,
	// bookings: bookingsReducer,
	// roomImages: imagesReducer,
	// reviews: reviewsReducer,
	// myReviews: myReviewsReducer,
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
