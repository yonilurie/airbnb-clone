//String literals for thunk action
const GET_IMAGES = "/images/get";

//Thunk actions
const getImages = (room) => {
	return {
		type: GET_IMAGES,
		room,
	};
};

//Thunk action creators

//Get the images posted by the owner of a room by its id
export const getRoomImages = (roomId) => async (dispatch) => {
	const roomIdNumber = Number(roomId);
	const response = await fetch(`/api/rooms/${roomIdNumber}`);
	const data = await response.json();
	dispatch(getImages(data));
	return data;
};

const initialState = {};

//Reducer
const imagesReducer = (state = initialState, action) => {
	let newState;
	switch (action.type) {
		case GET_IMAGES: {
			
			newState = Object.assign({}, action.room.images);
			return newState;
		}
		default:
			return state;
	}
};

export default imagesReducer;
