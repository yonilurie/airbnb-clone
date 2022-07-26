import { csrfFetch } from "./csrf";

//String literals for thunk action
const GET_ROOMS = "/rooms";
const GET_SPECIFIC_ROOM = "/rooms/:roomId";
const CREATE_ROOM = "/rooms/add";

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

const createARoom = (room) => {
	return {
		type: CREATE_ROOM,
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

export const createRoom = (room) => async (dispatch) => {
	const response = await csrfFetch("/api/rooms/add", {
		method: "POST",
		headers: {
			contentType: "application/json",
		},
		body: room,
	});

	const data = await response.json();

	dispatch(createARoom(data));
};

const initialState = {};

const roomReducer = (state = initialState, action) => {
	let newState;
	switch (action.type) {
		case GET_ROOMS:
			newState = Object.assign({}, action.rooms.rooms);
			console.log("ACTION", action);
			return newState;

		case GET_SPECIFIC_ROOM: {
			newState = Object.assign({}, action.room.rooms);
			return newState;
		}
		case CREATE_ROOM: {
			console.log(action);
			newState = { state };
			return newState;
		}
		default:
			return state;
	}
};

export default roomReducer;
