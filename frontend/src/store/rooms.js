import { csrfFetch } from "./csrf";

//String literals for thunk action
const GET_ROOMS = "/api/rooms";
const CREATE_ROOM = "/api/rooms/add";
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
	if (response.ok) {
		const data = await response.json();
		dispatch(getRoomsData(data));
		return data;
	}
};

//Create a room
export const createRoom = (room) => async (dispatch) => {
	const {
		name,
		address,
		city,
		state,
		country,
		lat,
		lng,
		description,
		price,
		image,
		guests,
		bedrooms,
		beds,
		bathrooms,
		amenities,
	} = room;
	const formData = new FormData();
	formData.append("name", name);
	formData.append("address", address);
	formData.append("city", city);
	formData.append("state", state);
	formData.append("country", country);
	formData.append("lat", lat);
	formData.append("lng", lng);
	formData.append("description", description);
	formData.append("price", price);
	formData.append("image", image);
	formData.append("guests", guests);
	formData.append("bedrooms", bedrooms);
	formData.append("beds", beds);
	formData.append("bathrooms", bathrooms);
	formData.append("amenities", amenities);

	const response = await csrfFetch("/api/rooms/add", {
		method: "POST",
		headers: {
			"Content-Type": "multipart/form-data",
		},
		body: formData,
	});
	if (response.ok) {
		const data = await response.json();
		dispatch(createARoom(data));
		return data;
	}
};

//Edit a room
export const editRoom = (roomEdits) => async (dispatch) => {
	console.log(roomEdits)
	const response = await csrfFetch(`/api/rooms/${roomEdits.id}`, {
		method: "PUT",
		headers: {
			contentType: "application/json",
		},
		body: roomEdits,
	});
	if (response.ok) {
		const data = await response.json();
		dispatch(editARoom(data));
		return data;
	}
};

//Reducer
const initialState = {};

const roomReducer = (state = initialState, action) => {
	let newState;
	switch (action.type) {
		case GET_ROOMS:
			newState = action.rooms;
			return newState;

		case CREATE_ROOM: {
			newState = { ...state };
			newState[action.room.id] = action.room;
			return newState;
		}
		case EDIT_ROOM: {
			newState = { ...state };
			if (newState[action.room.id]) {
				newState[action.room.id] = action.room;
			}
			return newState;
		}
		default:
			return state;
	}
};

export default roomReducer;
