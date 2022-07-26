import { csrfFetch } from "./csrf";

//String literals for thunk action
const GET_MY_ROOMS= "/api/rooms";

//Thunk actions
const getMyRooms = (room) => {
	return {
		type: GET_MY_ROOMS,
		room,
	};
};

//Thunk action creators

//Get info of a room
export const getMyRoomsData = () => async (dispatch) => {
	const response = await csrfFetch(`/api/rooms`);

    const data = await response.json();
    console.log(data)
	dispatch(getMyRooms(data));
	return data;
};

const initialState = {};

//Reducer
const myRoomReducer = (state = initialState, action) => {
	let newState;
	switch (action.type) {
        case GET_MY_ROOMS: {
            console.log(action)
			newState = Object.assign({}, action.room);
			return newState;
		}
		default:
			return state;
	}
};

export default myRoomReducer;
