//String literals for thunk action
const GET_ROOMS = "/rooms";

const getRoomsData = (rooms) => {
	return {
		type: GET_ROOMS,
		rooms,
	};
};

export const getRooms = () => async (dispatch) => {
	const response = await fetch("/rooms", {
		method: "GET",
	});
	const data = await response.json();
	dispatch(getRoomsData(data));
	return data;
};

const initialState = {};

const roomReducer = (state = initialState, action) => {
	let newState;
	switch (action.type) {
		case GET_ROOMS:
			newState = Object.assign({}, action.rooms.rooms);

			return newState;
		default:
			return state;
	}
};

export default roomReducer;
