import { csrfFetch } from "./csrf";

// String literals for thunk actions
//
const SET_USER = "session/setUser";
const REMOVE_USER = "session/removeUser";
const EDIT_REVIEW = "/api/reviews/EDIT";
const GET_USER_REVIEWS = "/api/reviews";
const DELETE_REVIEW = "/api/reviews/DELETE";
//Thunk actions
//
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

const deleteReview = (id) => {
	return {
		type: DELETE_REVIEW,
		id,
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

//Initial state for session
const initialState = { user: null, reviews: {} };

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
			newState = {
				...state,
				reviews: { ...action.reviews },
			};
			// newState.reviews = { ...action.payload };
			return newState;
		}
		case EDIT_REVIEW: {
			newState = { ...state };

			for (const key in newState.reviews) {
				if (
					Number(newState.reviews[key].id) ===
					Number(action.review.id)
				) {
					newState.reviews[key] = action.review;
					return newState;
				}
			}
			return newState;
		}

		case DELETE_REVIEW: {
			newState = { ...state };
			for (const key in newState.reviews) {
				if (Number(newState.reviews[key].id) === Number(action.id)) {
					delete newState.reviews[key];
					return newState;
				}
			}
			return newState;
		}

		case REMOVE_USER:
			newState = { ...state };
			newState.user = null;
			newState.reviews = null;
			return newState;
		default:
			return state;
	}
};

export default sessionReducer;
