import { csrfFetch } from "./csrf";

//String literals for thunk action
const GET_USER_BOOKINGS = "/api/bookings";

//Thunk actions
const getUserBookings = (bookings) => {
	return {
        type: GET_USER_BOOKINGS,
        bookings
	};
};

//Thunk action creators

//get all of a signed in users bookings
export const getAUsersBookings = () => async (dispatch) => {
	const response = await csrfFetch("/api/bookings");

    const data = await response.json();
    
	dispatch(getUserBookings(data));
	return data;
};

const initialState = {};

//Reducer
const myBookingsReducer = (state = initialState, action) => {
	let newState;
	switch (action.type) {
		case GET_USER_BOOKINGS: {
			newState = Object.assign({}, action.bookings);
			return newState;
		}

		default: {
			return state;
		}
	}
};

export default myBookingsReducer;
