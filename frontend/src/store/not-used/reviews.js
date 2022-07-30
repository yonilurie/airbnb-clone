import { csrfFetch } from "../csrf";

//String literals for thunk action
const GET_REVIEWS = "reviews/get";
const CREATE_REVIEW = "/reviews/create";
const EDIT_REVIEW = "/reviews/edit";
const DELETE_REVIEW = "/reviews/delete";

//Thunk actions
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

const editReview = (review) => {
	return {
		type: EDIT_REVIEW,
		review,
	};
};

const deleteReview = (roomId) => {
	return {
		type: DELETE_REVIEW,
		roomId,
	};
};

//Thunk action creators

//Get al reviews of a room by its id
export const getRoomReviews = (roomId) => async (dispatch) => {
	const roomIdNumber = Number(roomId);

	const response = await fetch(`/api/rooms/${roomIdNumber}/reviews`);
	const data = await response.json();

	dispatch(getReviews(data));
	return data;
};

//Create a review of a room, requires reviews as a JSON.stringify string and roomId
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

	const data = await response.json();

	dispatch(editReview(data));
	return data;
};

export const deleteAReview = (review) => async (dispatch) => {
	const [reviewId, roomId] = review;
	const response = await csrfFetch(
		`/api/reviews/${reviewId}`,
		{
			method: "DELETE",
		}
	);

	const data = await response.json();
	dispatch(deleteReview(roomId));

	return data;
};

const initialState = {};

//Reducer
const reviewsReducer = (state = initialState, action) => {
	let newState;
	switch (action.type) {
		case GET_REVIEWS: {
			newState = Object.assign({}, action.reviews);
			return newState;
		}

		case CREATE_REVIEW: {
			const review = action.reviewInfo;

			newState = { ...state, review };
			return newState;
		}
		case EDIT_REVIEW: {
			newState = { ...state };

			for (const key in newState) {
				if (Number(newState[key].id) === Number(action.review.id)) {
					newState[key] = action.review;
					return newState;
				}
			}

			return newState;
		}

		case DELETE_REVIEW: {
			newState = { ...state };
			for (const key in newState) {
				if (Number(newState[key].roomId) === Number(action.roomId)) {
					delete newState[key];
					return newState;
				}
			}

			return newState;
		}

		default:
			return state;
	}
};

export default reviewsReducer;
