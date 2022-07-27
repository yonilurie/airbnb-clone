import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory, NavLink } from "react-router-dom";

import { getRoomImages } from "../../store/roomImages";
import { getRoomReviews } from "../../store/reviews";
import { getRoomInfo } from "../../store/CurrentRoom";
import { deleteRoom } from "../../store/rooms";
import { editRoom } from "../../store/rooms";
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
	console.log(
		"87634987598437584375893475843759873485734895734987589347589437598347589347589",
		currentRoomReviews
	);

	//Will delete a room an redirect user to home screen
	const deleteARoom = () => {
		alert("TEST");
		console.log("test");
		dispatch(deleteRoom(roomId));
		history.push("/my-rooms");
		history.go("/my-rooms");
	};

	return (
		<>
			{isDisplayed && currentRoom && (
				<div>
					<div>{currentRoom.name}</div>
					<div>
						Star {Number(currentRoom.avgStarRating).toFixed(2)}
					</div>
					{currentRoomImages.length > 0 && (
						<img
							src={`${currentRoomImages[0].imageUrl}`}
							alt="first"
						></img>
					)}
					{currentRoomImages.length <= 0 && (
						<img
							src="https://www.publicdomainpictures.net/pictures/280000/velka/not-found-image-15383864787lu.jpg"
							alt="preview"
						></img>
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
