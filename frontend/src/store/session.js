import { csrfFetch } from "./csrf";
// user_actions.js

export const createUser = (user) => async (dispatch) => {
	const {
		images,
		image,
		username,
		email,
		password,
		lastName,
		firstName,
	} = user;
	const formData = new FormData();
	formData.append("username", username);
	formData.append("email", email);
	formData.append("password", password);
	formData.append("firstName", firstName);
	formData.append("lastName", lastName);

	// for multiple files
	if (images && images.length !== 0) {
		for (var i = 0; i < images.length; i++) {
			formData.append("images", images[i]);
		}
	}

	// for single file
	if (image) formData.append("image", image);

	const res = await csrfFetch(`/api/users/`, {
		method: "POST",
		headers: {
			"Content-Type": "multipart/form-data",
		},
		body: formData,
	});

	const data = await res.json();
	dispatch(setUser(data.user));
};
// String literals for thunk actions
//
const SET_USER = "session/setUser";
const REMOVE_USER = "session/removeUser";
const GET_MY_ROOMS = "/api/my-rooms";
const CREATE_ROOM = "/api/rooms/add";
const DELETE_MY_ROOM = "/api/my-rooms/delete";
const CREATE_USER_BOOKING = "/api/rooms/:roomId/";
const DELETE_USER_BOOKING = "/api/bookings/:bookingId";
const EDIT_USER_BOOKING = "api/bookings/edit";
const GET_USER_BOOKINGS = "/api/bookings";
const GET_USER_REVIEWS = "/api/reviews";
const CREATE_ROOM_REVIEW = "/reviews/create";
const EDIT_REVIEW = "/api/reviews/EDIT";
const DELETE_REVIEW = "/api/reviews/DELETE";
//Thunk actions
//

const deleteABooking = (bookingId) => {
	return {
		type: DELETE_USER_BOOKING,
		bookingId,
	};
};

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

const editABooking = (booking) => {
	return {
		type: EDIT_USER_BOOKING,
		booking,
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

	if (response.ok) {
		const data = await response.json();
		dispatch(getUserReviews(data));
		return data;
	}
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

	if (response.ok) {
		const data = await response.json();
		dispatch(editUserReview(data));
		return data;
	}
};

export const deleteAReview = (reviewId) => async (dispatch) => {
	const response = await csrfFetch(`/api/reviews/${reviewId}`, {
		method: "DELETE",
	});
	if (response.ok) {
		const data = await response.json();
		dispatch(deleteReview(reviewId));
		return data;
	}
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
	if (response.ok) {
		const data = await response.json();
		dispatch(getUserBookings(data));
		return data;
	}
};

//Create a room
export const createRoom = (room) => async (dispatch) => {
	const {
		name,
		address,
		city,
		state,
		country,
		lat,
		lng,
		description,
		price,
		images,
	} = room;
	const formData = new FormData();
	formData.append("name", name);
	formData.append("address", address);
	formData.append("city", city);
	formData.append("state", state);
	formData.append("country", country);
	formData.append("lat", lat);
	formData.append("lng", lng);
	formData.append("description", description);
	formData.append("price", price);
	// formData.append("previewImage", previewImage);
	if (images && images.length !== 0) {
		for (var i = 0; i < images.length; i++) {
			formData.append("images", images[i]);
		}
	}

	const response = await csrfFetch("/api/rooms/add", {
		method: "POST",
		headers: {
			"Content-Type": "multipart/form-data",
		},
		body: formData,
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
	const { startDate, endDate, roomId, guests } = booking;

	const response = await csrfFetch(`/api/rooms/${Number(roomId)}/bookings`, {
		method: "POST",
		headers: {
			contentType: "application/json",
		},
		body: JSON.stringify({
			startDate,
			endDate,
			guests,
		}),
	});

	const data = await response.json();
	if (!data.errors) {
		dispatch(createABooking(data));
	}
	return data;
};

export const editBooking = (booking) => async (dispatch) => {
	const { startDate, endDate, bookingId, roomId } = booking;

	const response = await csrfFetch(`/api/bookings/${bookingId}`, {
		method: "PUT",
		headers: {
			contentType: "application/json",
		},
		body: JSON.stringify({
			startDate,
			endDate,
			roomId
		}),
	});

	const data = await response.json();
	if (!data.errors) {
		dispatch(editABooking(data));
	}
	return data;
};

export const deleteBooking = (bookingId) => async (dispatch) => {
	const response = await csrfFetch(`/api/bookings/${bookingId}`, {
		method: "DELETE",
	});
	const data = await response.json();

	dispatch(deleteABooking(Number(bookingId)));
	return data;
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
			newState = { ...state };
			newState.bookings = action.bookings;
			return newState;
		}

		case CREATE_USER_BOOKING: {
			newState = {
				...state,
			};
			newState.bookings[action.bookingInfo.id] = {
				...action.bookingInfo,
			};
			return newState;
		}

		case EDIT_USER_BOOKING: {
			newState = { ...state };

			if (newState.bookings[action.bookingId]) {
				newState.bookings[action.bookingId] = action.booking;
			}

			return newState;
		}
		case DELETE_USER_BOOKING: {
			newState = { ...state };
			if (newState.bookings[action.bookingId]) {
				delete newState.bookings[action.bookingId];
			}

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
		case SET_USER:
			return { ...state, user: action.payload };
		default:
			return state;
	}
};

export default sessionReducer;
