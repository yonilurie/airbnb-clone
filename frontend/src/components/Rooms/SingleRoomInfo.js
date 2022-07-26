import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import { getRooms } from "../../store/rooms";
import { getRoomImages } from "../../store/roomImages";
import { getRoomReviews } from "../../store/reviews";

import "./SingleRoomInfo.css";

const SingleRoomInfo = () => {
	const dispatch = useDispatch();
	const { roomId } = useParams();

	useEffect(() => {
		dispatch(getRooms());
	}, []);
	useEffect(() => {
		dispatch(getRoomImages(roomId));
	}, []);
	useEffect(() => {
		dispatch(getRoomReviews(roomId));
	}, []);

	const currentRoom = useSelector((state) => state.rooms[roomId - 1]);
	const currentRoomImages = Object.values(
		useSelector((state) => state.roomImages)
	);
	const currentRoomReviews = Object.values(
		useSelector((state) => state.reviews)
	);
	console.log(currentRoomReviews);
	useSelector((state) => state);
	return (
		<>
			{currentRoom && (
				<div>
					<div>{currentRoom.name}</div>
					<div>Star</div>
					{currentRoomImages.length > 0 && (
						<img src={`${currentRoomImages[0].imageUrl}`}></img>
					)}
					{currentRoomImages.length <= 0 && (
						<img src="https://www.publicdomainpictures.net/pictures/280000/velka/not-found-image-15383864787lu.jpg"></img>
					)}
					<div>
						{currentRoom.city},{currentRoom.state},
						{currentRoom.country}
					</div>
					<div className="reviews-container">
						<div>Reviews</div>
						{currentRoomReviews.length > 0 &&
							currentRoomReviews.map((review) => {
								return (
									<ul
										key={review.id}
										className="review-content"
									>
										<li>{review.stars}</li>
										<li>{review.userId}</li>
										<li>{review.review}</li>
									</ul>
								);
							})}
					</div>
				</div>
			)}
		</>
	);
};

export default SingleRoomInfo;
