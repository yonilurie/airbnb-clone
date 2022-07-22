import { csrfFetch } from "./csrf";

// String literals for thunk actions
//
const SET_USER = "session/setUser";
const REMOVE_USER = "session/removeUser";

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
	return response;
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
	return result;
};

//Initial state for session
const initialState = { user: null };

// Reducer
//
const sessionReducer = (state = initialState, action) => {
	let newState;
	switch (action.type) {
		case SET_USER:
			newState = Object.assign({}, state);
			newState.user = action.payload;
			return newState;
		case REMOVE_USER:
			newState = Object.assign({}, state);
			newState.user = null;
			return newState;
		default:
			return state;
	}
};

export default sessionReducer;
