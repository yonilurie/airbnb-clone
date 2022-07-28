

const GET_ROOM_BOOKINGS = "/rooms/:roomId/bookings";


const getRoomBookings = (bookings) => {
	return {
		type: GET_ROOM_BOOKINGS,
		bookings,
	};
};



export const getARoomsBookings = (id) => async (dispatch) => {
	const response = await fetch(`/rooms/${id}/bookings`);

	const data = await response.json();
	
	dispatch(getRoomBookings(data));
	return data;
};


const initialState = {};

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
