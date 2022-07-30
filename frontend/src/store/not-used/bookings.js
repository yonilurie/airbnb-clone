//String literals for thunk action
const GET_ROOM_BOOKINGS = "/api/rooms/:roomId/bookings";

//Thunk actions
const getRoomBookings = (bookings) => {
	return {
		type: GET_ROOM_BOOKINGS,
		bookings,
	};
};

//Thunk action creators

//get all bookings for a room by its id
export const getARoomsBookings = (id) => async (dispatch) => {
	const response = await fetch(`/api/rooms/${id}/bookings`);

	const data = await response.json();

	dispatch(getRoomBookings(data));
	return data;
};

const initialState = {};

//Reducer
const bookingsReducer = (state = initialState, action) => {
	let newState;
	switch (action.type) {
		case GET_ROOM_BOOKINGS: {
			newState = Object.assign({}, action.bookings);

			return newState;
		}

		default:
			return state;
	}
};

export default bookingsReducer;
