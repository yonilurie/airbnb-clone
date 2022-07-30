import { csrfFetch } from "./csrf";

//String literals for thunk action
const GET_USER_REVIEWS = "/api/reviews";
const DELETE_REVIEW = "/api/reviews/DELETE";
//Thunk actions
const getUserReviews = (reviews) => {
	return {
		type: GET_USER_REVIEWS,
		reviews,
	};
};

const deleteReview = (id) => {
	return {
		type: DELETE_REVIEW,
		id,
	};
};

//Thunk action creators

//get all of a signed in users bookings
export const getAUsersReviews = () => async (dispatch) => {
	const response = await csrfFetch("/api/reviews");

	const data = await response.json();

	dispatch(getUserReviews(data));
	return data;
};

export const deleteAReview = (reviewId) => async (dispatch) => {
	const response = await csrfFetch(`/api/reviews/${reviewId}`, {
		method: "DELETE",
	});

	const data = await response.json();
	console.log(data)
	dispatch(deleteReview(reviewId));
	return data;
};

const initialState = {};

//Reducer
const myReviewsReducer = (state = initialState, action) => {
	let newState;
	switch (action.type) {
		case GET_USER_REVIEWS: {
			newState = Object.assign({}, action.reviews);
			return newState;
		}
		case DELETE_REVIEW: {
			newState = { ...state };
			for (const key in newState) {
				console.log(Number(newState[key].id) === Number(action.id))
				if (Number(newState[key].id) === Number(action.id)) {
					delete newState[key];
					return newState;
				}
			}
			return newState;
		}
		default: {
			return state;
		}
	}
};

export default myReviewsReducer;
