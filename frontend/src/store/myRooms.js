import { csrfFetch } from "./csrf";

//String literals for thunk action
const GET_MY_ROOMS = "/api/my-rooms";

//Thunk actions
const getMyRooms = (rooms) => {
	return {
		type: GET_MY_ROOMS,
		rooms,
	};
};

//Thunk action creators

//Get info of a room
export const getMyRoomsData = () => async (dispatch) => {
	const response = await csrfFetch(`/api/rooms/my-rooms`);

	if (response.ok) {
		const data = await response.json();
		dispatch(getMyRooms(data));
		return data;
	}
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
		default:
			return state;
	}
};

export default myRoomReducer;
