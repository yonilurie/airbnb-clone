import { csrfFetch } from "./csrf";

// String literals for thunk actions
//
const SET_USER = "session/setUser";
const REMOVE_USER = "session/removeUser";
const GET_MY_ROOMS = "/api/my-rooms";
const CREATE_ROOM = "/api/rooms/add";
const DELETE_MY_ROOM = "/api/my-rooms/delete";
const CREATE_USER_BOOKING = "/api/rooms/:roomId/";
const GET_USER_BOOKINGS = "/api/bookings";
const GET_USER_REVIEWS = "/api/reviews";
const CREATE_ROOM_REVIEW = "/reviews/create";
const EDIT_REVIEW = "/api/reviews/EDIT";
const DELETE_REVIEW = "/api/reviews/DELETE";
//Thunk actions
//

const createARoom = (room) => {
	return {
		type: CREATE_ROOM,
		room,
	};
};
const setUser = (user) => {
	return {
		type: SET_USER,
		payload: user,
	};
};

const removeUser = () => {
	return {
		type: REMOVE_USER,
	};
};

const getMyRooms = (rooms) => {
	return {
		type: GET_MY_ROOMS,
		rooms,
	};
};

const deleteMyRoom = (id) => {
	return {
		type: DELETE_MY_ROOM,
		id,
	};
};

const getUserBookings = (bookings) => {
	return {
		type: GET_USER_BOOKINGS,
		bookings,
	};
};

const getUserReviews = (reviews) => {
	return {
		type: GET_USER_REVIEWS,
		reviews,
	};
};

const editUserReview = (review) => {
	return {
		type: EDIT_REVIEW,
		review,
	};
};

const deleteReview = (reviewId) => {
	return {
		type: DELETE_REVIEW,
		reviewId,
	};
};

const createARoomReview = (reviewInfo) => {
	return {
		type: CREATE_ROOM_REVIEW,
		reviewInfo,
	};
};

const createABooking = (bookingInfo) => {
	return {
		type: CREATE_USER_BOOKING,
		bookingInfo,
	};
};
//Thunk action creators
//
//Logs in the user
export const login = (user) => async (dispatch) => {
	const { credential, password } = user;
	const response = await csrfFetch("/api/session/login", {
		method: "POST",
		body: JSON.stringify({
			credential,
			password,
		}),
	});
	const data = await response.json();
	dispatch(setUser(data.user));
	return data;
};

//Restores the user if they are logged in
export const restoreUser = () => async (dispatch) => {
	const result = await csrfFetch("/api/session");
	const data = await result.json();
	dispatch(setUser(data.user));
};

export const getMyRoomsData = () => async (dispatch) => {
	const response = await csrfFetch(`/api/rooms/my-rooms`);

	const data = await response.json();

	dispatch(getMyRooms(data));
	return data;
};

export const deleteARoom = (id) => async (dispatch) => {
	const response = await csrfFetch(`/api/rooms/${id}`, {
		method: "DELETE",
	});
	const data = await response.json();
	dispatch(deleteMyRoom(id));
	return id;
};

// Register a user
export const signup = (user) => async (dispatch) => {
	const { email, password, username, firstName, lastName } = user;
	const result = await csrfFetch("/api/users/register", {
		method: "POST",
		body: JSON.stringify({
			email,
			password,
			username,
			firstName,
			lastName,
		}),
	});
	const data = await result.json();
	dispatch(setUser(data.user));
	return data;
};

export const getAUsersReviews = () => async (dispatch) => {
	const response = await csrfFetch("/api/reviews");

	const data = await response.json();

	dispatch(getUserReviews(data));
	return data;
};

export const editAUsersReview = (reviewInfo) => async (dispatch) => {
	const [id, review] = reviewInfo;
	const response = await csrfFetch(`/api/reviews/${id}`, {
		method: "PUT",
		headers: {
			contentType: "application/json",
		},
		body: JSON.stringify(review),
	});

	const data = await response.json();

	dispatch(editUserReview(data));
};

export const deleteAReview = (reviewId) => async (dispatch) => {
	const response = await csrfFetch(`/api/reviews/${reviewId}`, {
		method: "DELETE",
	});

	const data = await response.json();

	dispatch(deleteReview(reviewId));
	return data;
};

// Logout a user
export const logout = () => async (dispatch) => {
	const result = await csrfFetch("/api/session", {
		method: "DELETE",
	});
	dispatch(removeUser());
	return result;
};

//get all of a signed in users bookings
export const getAUsersBookings = () => async (dispatch) => {
	const response = await csrfFetch("/api/bookings");

	const data = await response.json();

	dispatch(getUserBookings(data));
	return data;
};

//Create a room
export const createRoom = (room) => async (dispatch) => {
	const response = await csrfFetch("/api/rooms/add", {
		method: "POST",
		headers: {
			contentType: "application/json",
		},
		body: room,
	});

	const data = await response.json();
	dispatch(createARoom(data));
};

//Create a review of a room, requires reviews as a JSON.stringify string and roomId
export const createRoomReview = (reviewData) => async (dispatch) => {
	const [roomId, review] = reviewData;

	const response = await csrfFetch(`/api/rooms/${Number(roomId)}/reviews`, {
		method: "POST",
		headers: {
			contentType: "application/json",
		},
		body: JSON.stringify(review),
	});

	const data = await response.json();

	dispatch(createARoomReview(data));
};

export const createBooking = (booking) => async (dispatch) => {
	const { startDate, endDate, roomId } = booking;

	const response = await csrfFetch(`/api/rooms/${Number(roomId)}/bookings`, {
		method: "POST",
		headers: {
			contentType: "application/json",
		},
		body: JSON.stringify({
			startDate,
			endDate,
		}),
	});

	const data = await response.json();
	if (!data.errors) {
		dispatch(createABooking(data));
	}
	return data
};

//Initial state for session
const initialState = { user: null, reviews: {}, bookings: {}, rooms: {} };

// Reducer
//
const sessionReducer = (state = initialState, action) => {
	let newState;
	switch (action.type) {
		case SET_USER:
			newState = { ...state };
			newState.user = action.payload;

			return newState;

		case GET_USER_REVIEWS: {
			const reviews = {};

			if (action.reviews.length) {
				action.reviews.forEach((review) => {
					reviews[review.id] = review;
				});
			}
			newState = {
				...state,
			};
			newState.reviews = reviews;

			return newState;
		}

		case GET_USER_BOOKINGS: {
			const bookings = {};
			if (action.bookings.length) {
				action.bookings.forEach((booking) => {
					bookings[booking.id] = booking;
				});
			}
			newState = { ...state, bookings };

			return newState;
		}

		case CREATE_USER_BOOKING: {
			newState = {
				...state,
				bookings: {
					...state.bookings,
				},
			};
			newState.bookings[action.bookingInfo.id] = {
				...action.bookingInfo,
			};
			return newState;
		}

		case GET_MY_ROOMS: {
			const rooms = {};
			action.rooms.forEach((room) => {
				rooms[room.id] = room;
			});
			newState = { ...state, rooms };

			return newState;
		}

		case CREATE_ROOM: {
			const room = action.room;
			newState = { ...state };
			newState.rooms[room.id] = room;
			return newState;
		}

		case DELETE_MY_ROOM: {
			newState = { ...state };

			if (newState.rooms[action.id]) {
				delete newState.rooms[action.id];
			}

			return newState;
		}

		case CREATE_ROOM_REVIEW: {
			newState = {
				...state,
				reviews: {
					...state.reviews,
				},
			};
			newState.reviews[action.reviewInfo.id] = { ...action.reviewInfo };
			return newState;
		}

		case EDIT_REVIEW: {
			newState = { ...state };

			if (newState.reviews[action.review.id]) {
				newState.reviews[action.review.id] = action.review;
				return newState;
			}

			return newState;
		}

		case DELETE_REVIEW: {
			newState = { ...state };
			if (newState.reviews[action.reviewId]) {
				delete newState.reviews[action.reviewId];
			}
			return newState;
		}

		case REMOVE_USER:
			newState = { ...initialState };

			return newState;
		default:
			return state;
	}
};

export default sessionReducer;
