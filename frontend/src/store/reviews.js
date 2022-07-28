import { csrfFetch } from "./csrf";

const GET_REVIEWS = "reviews/get";
const CREATE_REVIEW = "/reviews/create";

const getReviews = (reviews) => {
	return {
		type: GET_REVIEWS,
		reviews,
	};
};

const createReview = (reviewInfo) => {
	return {
		type: CREATE_REVIEW,
		reviewInfo,
	};
};

export const getRoomReviews = (roomId) => async (dispatch) => {
	const roomIdNumber = Number(roomId);
	const response = await fetch(`/api/rooms/${roomIdNumber}/reviews`);
	const data = await response.json();

	dispatch(getReviews(data));
	return data;
};

export const create = (reviewData) => async (dispatch) => {
	const [roomId, review] = reviewData;

	const response = await csrfFetch(`/api/rooms/${Number(roomId)}/reviews`, {
		method: "POST",
		headers: {
			contentType: "application/json",
		},
		body: review,
	});

	const data = await response.json();

	dispatch(createReview(data));
};

const initialState = {};

const reviewsReducer = (state = initialState, action) => {
	let newState;
	switch (action.type) {
		case GET_REVIEWS: {
			newState = Object.assign({}, action.reviews);
			return newState;
		}

		case CREATE_REVIEW: {
			const review = action.review;
			newState = { ...state, review };
		}
		default:
			return state;
	}
};

export default reviewsReducer;
