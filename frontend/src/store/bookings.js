// import { csrfFetch } from "./csrf";

const GET_ROOM_BOOKINGS = "/rooms/:roomId/bookings";
// const GET_USER_BOOKINGS = "/:userId/bookings";

const getRoomBookings = (bookings) => {
	return {
		type: GET_ROOM_BOOKINGS,
		bookings,
	};
};

// const getUserBookings = (userId) => {
// 	return {
// 		type: GET_USER_BOOKINGS,
// 		userId,
// 	};
// };

export const getARoomsBookings = (id) => async (dispatch) => {
	const response = await fetch(`/rooms/${id}/bookings`);

	const data = await response.json();

	dispatch(getRoomBookings(data));
	return data;
};

// export const getAUsersBookings = (id) => async (dispatch) => {
// 	const response = csrfFetch("/api/bookings");

// 	const data = await response.json();

// 	dispatch(getAUsersBookings(data));
// 	return data;
// };

const initialState = {};

const bookingsReducer = (state = initialState, action) => {
	let newState;
	switch (action.type) {
		case GET_ROOM_BOOKINGS: {
			console.log(action.bookings);
			newState = Object.assign({}, action.bookings);
			console.log(newState);
			return newState;
		}

		default:
			return state;
	}
};

export default bookingsReducer;
