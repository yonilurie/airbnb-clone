import { csrfFetch } from "./csrf";

//String literals for thunk action
const GET_ROOMS = "/rooms";
const CREATE_ROOM = "/api/rooms/add";
const DELETE_ROOM = "/api/rooms/:roomId";

//Thunk actions
//
const getRoomsData = (rooms) => {
	return {
		type: GET_ROOMS,
		rooms,
	};
};

const createARoom = (room) => {
	return {
		type: CREATE_ROOM,
		room,
	};
};

const deleteARoom = (id) => {
	return {
		type: DELETE_ROOM,
		id,
	};
};

//Thunk action creators
//
//Get all rooms
export const getRooms = () => async (dispatch) => {
	const response = await fetch("/rooms", {
		method: "GET",
	});

	const data = await response.json();

	dispatch(getRoomsData(data));
	return data;
};

//Create a room
export const createRoom = (room) => async (dispatch) => {
	const response = await csrfFetch("/api/rooms/add", {
		method: "POST",
		headers: {
			contentType: "application/json",
		},
		body: room,
	});

	const data = await response.json();
	console.log(response);
	dispatch(createARoom(data));
};

//delete a room
export const deleteRoom = (roomId) => async (dispatch) => {
	const response = await csrfFetch(`/api/rooms/${roomId}`, {
		method: "DELETE",
	});
	const res = await response.json();
	dispatch(deleteARoom(roomId));
};

const initialState = {};

//Reducer
const roomReducer = (state = initialState, action) => {
	let newState;
	switch (action.type) {
		case GET_ROOMS:
			newState = Object.assign({}, action.rooms.rooms);
			return newState;

		case CREATE_ROOM: {
			const room = action.room;
			newState = Object.assign(state, room);
			return newState;
		}
		case DELETE_ROOM: {
			newState = { ...state };
			console.log(newState, "NEWSTATE");
			console.log(action, "ACTION");
			delete newState[action.roomId];
			return newState;
			// return state
		}
		default:
			return state;
	}
};

export default roomReducer;
