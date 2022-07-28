//String literals for thunk action
const GET_SPECIFIC_ROOM = "/api/rooms/:roomId";

//Thunk actions
const getSpecificRoomData = (room) => {
	return {
		type: GET_SPECIFIC_ROOM,
		room,
	};
};



//Thunk action creators

//Get info of a room
export const getRoomInfo = (id) => async (dispatch) => {
	const response = await fetch(`/api/rooms/${id}`);

	const data = await response.json();

	dispatch(getSpecificRoomData(data));

	return data;
};

const initialState = {};

//Reducer
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
