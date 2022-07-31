import { csrfFetch } from "./csrf";

//String literals for thunk action
const GET_ROOMS = "/api/rooms";
const CREATE_ROOM = "/api/rooms/add";
const DELETE_ROOM = "/api/rooms/:roomId/delete";
const EDIT_ROOM = "/api/rooms/:roomId/edit";

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

const editARoom = (room) => {
	return {
		type: EDIT_ROOM,
		room,
	};
};

//Thunk action creators
//
//Get all rooms
export const getRooms = () => async (dispatch) => {
	const response = await fetch("/api/rooms", {
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

//edit a room
export const editRoom = (roomEdits) => async (dispatch) => {
	const response = await csrfFetch(`/api/rooms/${roomEdits.id}`, {
		method: "PUT",
		headers: {
			contentType: "application/json",
		},
		body: roomEdits,
	});

	const data = await response.json();

	dispatch(editARoom(data));
};

const initialState = {};

//Reducer
const roomReducer = (state = initialState, action) => {
	let newState;
	switch (action.type) {
		case GET_ROOMS:
			const rooms = {};
			const fetchedRooms = { ...action.rooms };
			for (const key in fetchedRooms) {
				rooms[fetchedRooms[key].id] = fetchedRooms[key];
			}
			newState = { ...rooms };
			return newState;

		case CREATE_ROOM: {
			const room = action.room;
			newState = Object.assign(state, room);
			return newState;
		}

		case DELETE_ROOM: {
			newState = { ...state };

			for (const key in newState) {
				if (Number(newState[key].id) === Number(action.id)) {
					delete newState[key].id;
					return newState;
				}
			}

			// delete newState[action.id];
			return newState;
		}
		case EDIT_ROOM: {
			newState = { ...state };

			for (const key in newState) {
				if (Number(newState[key].roomId) === Number(action.room.id)) {
					newState[key].roomId = action.room;
					return newState;
				}
			}

			return newState;
		}
		default:
			return state;
	}
};

export default roomReducer;
