const GET_IMAGES = "images/get";

const getImages = (room) => {
	return {
		type: GET_IMAGES,
		room,
	};
};

export const getRoomImages = (roomId) => async (dispatch) => {
	const roomIdNumber = Number(roomId);
	const response = await fetch(`/rooms/${roomIdNumber}`);
	const data = await response.json();
	dispatch(getImages(data));
	return data;
};

const initialState = {};

const imagesReducer = (state = initialState, action) => {
	let newState;
	switch (action.type) {
		case GET_IMAGES: {
			console.log(action);
			newState = Object.assign({}, action.room.images);
			return newState;
		}
		default:
			return state;
	}
};

export default imagesReducer;
