import { csrfFetch } from "./csrf";

//String literals for thunk action
const GET_SPECIFIC_ROOM = "/api/rooms/:roomId";
const GET_CURRENT_ROOM_BOOKINGS = "/api/rooms/:roomId/bookings";
const CREATE_ROOM_REVIEW = "/reviews/create";
const EDIT_ROOM_REVIEW = "/reviews/edit";
const DELETE_ROOM_REVIEW = "/api/rooms/reviews/delete";

//Thunk actions
const getSpecificRoomData = (room) => {
	return {
		type: GET_SPECIFIC_ROOM,
		room,
	};
};

const getRoomBookings = (bookings) => {
	return {
		type: GET_CURRENT_ROOM_BOOKINGS,
		bookings,
	};
};

const createARoomReview = (reviewInfo) => {
	return {
		type: CREATE_ROOM_REVIEW,
		reviewInfo,
	};
};

const editReview = (review) => {
	return {
		type: EDIT_ROOM_REVIEW,
		review,
	};
};

const deleteARoomReview = (reviewId) => {
	return {
		type: DELETE_ROOM_REVIEW,
		reviewId,
	};
};

//Thunk action creators

//Get info of a room
export const getRoomInfo = (id) => async (dispatch) => {
	const response = await fetch(`/api/rooms/${id}`);

	if (response.ok) {
		const data = await response.json();
		dispatch(getSpecificRoomData(data));
		return data;
	}
};
//get all bookings for a room by its id
export const getARoomsBookings = (id) => async (dispatch) => {
	const response = await fetch(`/api/rooms/${id}/bookings`);

	if (response.ok) {
		const data = await response.json();
		dispatch(getRoomBookings(data));
		return data;
	}
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
	if (response.ok) {
		const data = await response.json();
		dispatch(createARoomReview(data));
		return data;
	}
};

//Edit a currently existing review
export const editAReview = (reviewData) => async (dispatch) => {
	const [review, reviewId, roomId] = reviewData;
	const response = await csrfFetch(
		`/api/rooms/${roomId}/reviews/${reviewId}`,
		{
			method: "PUT",
			headers: {
				contentType: "application/json",
			},
			body: JSON.stringify(review),
		}
	);
	if (response.ok) {
		const data = await response.json();
		dispatch(editReview(data));
		return data;
	}
};

//Delete an existing review of a room
export const deleteRoomReview = (reviewId) => async (dispatch) => {
	const response = await csrfFetch(`/api/reviews/${reviewId}`, {
		method: "DELETE",
	});
	if (response.ok) {
		const data = await response.json();
		dispatch(deleteARoomReview(reviewId));
		return data;
	}
};

//Reducer
const initialState = {};
const singleRoomReducer = (state = initialState, action) => {
	let newState;
	switch (action.type) {
		case GET_SPECIFIC_ROOM: {
			newState = { ...action.room };
			const reviews = {};
			if (newState.reviews) {
				newState.reviews.forEach((review) => {
					reviews[review.id] = review;
				});
			}
			newState.reviews = reviews;
			return newState;
		}

		case GET_CURRENT_ROOM_BOOKINGS: {
			newState = { ...state };
			newState.bookings = action.bookings;
			return newState;
		}

		case CREATE_ROOM_REVIEW: {
			newState = { ...state };
			newState.reviews[action.reviewInfo.id] = action.reviewInfo;
			return newState;
		}
		case EDIT_ROOM_REVIEW: {
			newState = { ...state };
			newState.reviews[action.review.id] = action.review;
			return newState;
		}
		case DELETE_ROOM_REVIEW: {
			newState = { ...state };
			delete newState.reviews[action.reviewId];
			return newState;
		}
		default:
			return state;
	}
};

export default singleRoomReducer;
