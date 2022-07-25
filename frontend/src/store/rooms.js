//String literals for thunk action
const GET_ROOMS = "/rooms";
const GET_SPECIFIC_ROOM = "/rooms/:roomId";

const getRoomsData = (rooms) => {
	return {
		type: GET_ROOMS,
		rooms,
	};
};

const getSpecificRoomData = (room) => {
	return {
		type: GET_SPECIFIC_ROOM,
		room,
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

export const getRoomInfo = (room) => async (dispatch) => {
	const response = await fetch(`/rooms/${room.id}`);

	const data = await response.json();
	dispatch(getSpecificRoomData(room));

	return data;
};

const initialState = {};

const roomReducer = (state = initialState, action) => {
	let newState;
	switch (action.type) {
		case GET_ROOMS:
			newState = Object.assign({}, action.rooms.rooms);
			return newState;

		case GET_SPECIFIC_ROOM: {
			newState = Object.assign({}, action.room.rooms);
			return newState;
		}
		default:
			return state;
	}
};

export default roomReducer;
