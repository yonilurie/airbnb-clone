import { csrfFetch } from "./csrf";

const GET_USER_BOOKINGS = "/api/bookings";

const getUserBookings = (bookings) => {
	return {
        type: GET_USER_BOOKINGS,
        bookings
	};
};

export const getAUsersBookings = () => async (dispatch) => {
	const response = await csrfFetch("/api/bookings");

    const data = await response.json();
    console.log(data)
	dispatch(getUserBookings(data));
	return data;
};

const initialState = {};

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
