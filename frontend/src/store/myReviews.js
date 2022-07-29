import { csrfFetch } from "./csrf";

//String literals for thunk action
const GET_USER_REVIEWS = "/api/reviews";

//Thunk actions
const getUserReviews = (reviews) => {
	return {
        type: GET_USER_REVIEWS,
        reviews
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

const initialState = {};

//Reducer
const myReviewsReducer = (state = initialState, action) => {
	let newState;
	switch (action.type) {
		case GET_USER_REVIEWS: {
			newState = Object.assign({}, action.reviews);
			return newState;
		}

		default: {
			return state;
		}
	}
};

export default myReviewsReducer;
