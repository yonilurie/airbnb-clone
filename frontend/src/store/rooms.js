import { csrfFetch } from "./csrf";

//String literals for thunk action
const GET_ROOMS = "/rooms";
const CREATE_ROOM = "/api/rooms/add";

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
		default:
			return state;
	}
};

export default roomReducer;
