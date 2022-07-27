import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory, NavLink } from "react-router-dom";

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

	const [isDisplayed, setIsDisplayed] = useState(false);

	useEffect(() => {
		setInterval(() => {
			setIsDisplayed(true);
		}, 100);
	}, []);

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
		history.push("/my-rooms");
		history.go("/my-rooms");
	};

	return (
		<>
			{isDisplayed && currentRoom && (
				<div>
					<div>{currentRoom.name}</div>
					{currentRoom.avgStarRating >= 1 && (
						<div>
							Star {Number(currentRoom.avgStarRating).toFixed(2)}
						</div>
					)}
					{currentRoom.avgStarRating < 1 && <div>No Reviews Yet</div>}
					{currentRoomImages.length > 0 && (
						<img
							src={`${currentRoomImages[0].imageUrl}`}
							alt="first"
						></img>
					)}
					{currentRoomImages.length <= 0 && (
						<img src={currentRoom.previewImage} alt="preview"></img>
					)}
					<div>
						{currentRoom.city},{currentRoom.state},
						{currentRoom.country}
					</div>
					{currentRoomReviews.length > 0 && (
						<div className="reviews-container">
							<div>Reviews</div>
							{currentRoomReviews.length > 0 &&
								currentRoomReviews[0] !==
									"Room couldn't be found" &&
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
					{sessionuser && sessionuser.id === currentRoom.ownerId && (
						<>
							<button onClick={deleteARoom}>Delete</button>
							<NavLink to={`/rooms/${roomId}/edit`}>Edit</NavLink>
						</>
					)}
				</div>
			)}
		</>
	);
};

export default SingleRoomInfo;
