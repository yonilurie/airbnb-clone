const GET_SPECIFIC_ROOM = "/rooms/:roomId";

const getSpecificRoomData = (room) => {
	return {
		type: GET_SPECIFIC_ROOM,
		room,
	};
};

export const getRoomInfo = (id) => async (dispatch) => {
	const response = await fetch(`/rooms/${id}`);

	const data = await response.json();

	dispatch(getSpecificRoomData(data));

	return data;
};

const initialState = {};

const singleRoomReducer = (state = initialState, action) => {
	let newState;
	switch (action.type) {
		case GET_SPECIFIC_ROOM: {
			newState = Object.assign({}, action.room);
			return newState;
		}
		default:
			return state;
	}
};

export default singleRoomReducer;
