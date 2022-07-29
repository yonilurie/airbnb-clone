import { csrfFetch } from "./csrf";

//String literals for thunk action
const GET_MY_ROOMS = "/api/my-rooms";
const DELETE_MY_ROOM = "/api/my-rooms/delete";
//Thunk actions
const getMyRooms = (rooms) => {
	return {
		type: GET_MY_ROOMS,
		rooms,
	};
};

const deleteMyRoom = (id) => {
	return {
		type: DELETE_MY_ROOM,
		id,
	};
};

//Thunk action creators

//Get info of a room
export const getMyRoomsData = () => async (dispatch) => {
	const response = await csrfFetch(`/api/rooms/my-rooms`);

	const data = await response.json();
	console.log(data);
	dispatch(getMyRooms(data));
	return data;
};

export const deleteARoom = (id) => async (dispatch) => {
	const response = await csrfFetch(`/api/rooms/my-rooms`);
	const data = await response.json();
	dispatch(deleteMyRoom(id));
	return id;
};

const initialState = {};

//Reducer
const myRoomReducer = (state = initialState, action) => {
	let newState;
	switch (action.type) {
		case GET_MY_ROOMS: {
			newState = { ...action.rooms };

			return newState;
		}
		case DELETE_MY_ROOM: {
			newState = { ...state };

			for (const key in newState) {
				console.log(Number(newState[key].id) === Number(action.id));
				if (Number(newState[key].id) === Number(action.id)) {
					delete newState[key].id;
					return newState;
				}
			}
			return newState;
		}
		default:
			return state;
	}
};

export default myRoomReducer;
