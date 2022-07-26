import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";

import { getRoomImages } from "../../store/roomImages";
import { getRoomReviews } from "../../store/reviews";
import { getRoomInfo } from "../../store/CurrentRoom";
import { deleteRoom } from "../../store/rooms";
import "./SingleRoomInfo.css";

const SingleRoomInfo = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const sessionuser = useSelector((state) => state.session.user);
	const { roomId } = useParams();

	//Get room info, images, and reviews
	useEffect(() => {
		dispatch(getRoomInfo(roomId));
	}, [dispatch, roomId]);

	useEffect(() => {
		dispatch(getRoomImages(roomId));
	}, [dispatch, roomId]);

	useEffect(() => {
		dispatch(getRoomReviews(roomId));
	}, [dispatch, roomId]);

	//Assign room, images, and reviews to variables for easier access
	const currentRoom = useSelector((state) => state.currentRoom);
	const currentRoomImages = Object.values(
		useSelector((state) => state.roomImages)
	);
	const currentRoomReviews = Object.values(
		useSelector((state) => state.reviews)
	);

	//Will delete a room an redirect user to home screen
	const deleteARoom = () => {
		dispatch(deleteRoom(roomId));
		history.push("/");
	};

	return (
		<>
			{!currentRoom && <div>LOADING</div>}
			{currentRoom && (
				<div>
					<div>{currentRoom.name}</div>
					<div>
						Star {Number(currentRoom.avgStarRating).toFixed(2)}
					</div>
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
					{currentRoomReviews.length > 0 && (
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
					)}
				</div>
			)}
			{sessionuser && sessionuser.id === currentRoom.ownerId && (
				<button onClick={deleteARoom}>Delete</button>
			)}
		</>
	);
};

export default SingleRoomInfo;
