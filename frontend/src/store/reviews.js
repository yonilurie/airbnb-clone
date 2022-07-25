const GET_REVIEWS = "reviews/get";

const getReviews = (reviews) => {
	return {
		type: GET_REVIEWS,
		reviews,
	};
};

export const getRoomReviews = (roomId) => async (dispatch) => {
	const roomIdNumber = Number(roomId);
	const response = await fetch(`/rooms/${roomIdNumber}/reviews`);
	const data = await response.json();

	dispatch(getReviews(data));
	return data;
};

const initialState = {};

const reviewsReducer = (state = initialState, action) => {
	let newState;
	switch (action.type) {
		case GET_REVIEWS: {
			console.log(action, "ACTION");
			newState = Object.assign({}, action.reviews);
			return newState;
		}
		default:
			return state;
	}
};

export default reviewsReducer;
