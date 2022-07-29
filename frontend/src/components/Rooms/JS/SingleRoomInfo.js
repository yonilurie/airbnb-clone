import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory, NavLink } from "react-router-dom";

import { getRoomImages } from "../../../store/roomImages";
import { getRoomReviews } from "../../../store/reviews";
import { getRoomInfo } from "../../../store/CurrentRoom";
import { deleteRoom, getRooms } from "../../../store/rooms";
import { getARoomsBookings } from "../../../store/bookings";

import Reviews from "./Reviews";

import "../CSS/SingleRoomInfo.css";

const SingleRoomInfo = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const sessionuser = useSelector((state) => state.session.user);
	const { roomId } = useParams();

	const [isDisplayed, setIsDisplayed] = useState(false);

	if (isNaN(Number(roomId))) {
		history.push("/");
	}

	useEffect(() => {
		setInterval(() => {
			setIsDisplayed(true);
		}, 1000);
	}, []);

	//Assign room, images, and reviews to variables for easier access
	const currentRoom = useSelector((state) => state.currentRoom);
	const currentRoomImages = Object.values(
		useSelector((state) => state.roomImages)
	);
	const currentRoomReviews = Object.values(
		useSelector((state) => state.reviews)
	);

	// const currentRoomBookings = Object.values(
	// 	useSelector((state) => state.bookings)
	// );

	//Get room info, images, and reviews
	useEffect(() => {
		dispatch(getRoomInfo(Number(roomId)));
	}, [dispatch, roomId]);

	useEffect(() => {
		dispatch(getRoomImages(Number(roomId)));
	}, [dispatch, roomId]);

	useEffect(() => {
		dispatch(getRoomReviews(Number(roomId)));
	}, [dispatch, roomId]);

	useEffect(() => {
		dispatch(getARoomsBookings(Number(roomId)));
	}, [dispatch, roomId]);

	useEffect(() => {
		if (currentRoom.Owner) {
			const roomName = currentRoom.name;
			document.title = `${roomName}`;
		}
	}, [currentRoom]);

	//Will delete a room an redirect user to home screen
	const deleteARoom = () => {
		dispatch(deleteRoom(roomId));
		dispatch(getRooms());
		history.push("/my-rooms");
	};

	return (
		<div className="content-container">
			{isDisplayed && currentRoom && (
				<div className="room-content">
					<div>
						<div className="room-details">
							<h1 className="room-name">{currentRoom.name}</h1>
							{currentRoom.avgStarRating >= 1 && (
								<div className="room-reviews-and-location">
									★
									{Number(currentRoom.avgStarRating).toFixed(
										2
									)}
									{" · "}
									{Number(currentRoom.numReviews)} review(s)
									{" · "}
									{currentRoom.city},{currentRoom.state},
									{currentRoom.country}
								</div>
							)}
							{currentRoom.avgStarRating < 1 && (
								<div>
									No Reviews Yet {currentRoom.city},
									{currentRoom.state},{currentRoom.country}
								</div>
							)}
						</div>

						<div className="room-images">
							{currentRoomImages.length > 0 && (
								<img
									src={`${currentRoomImages[0].imageUrl}`}
									alt="first"
									className="main-image"
								></img>
							)}
							{currentRoomImages.length <= 0 && (
								<img
									src={currentRoom.previewImage}
									alt="preview"
									className="main-image"
								></img>
							)}
						</div>
						{currentRoom.Owner && (
							<h2>
								Entire home hosted by{" "}
								{currentRoom.Owner.firstName}
							</h2>
						)}
					</div>

					{currentRoomReviews.length > 0 && (
						<div className="reviews-container">
							{currentRoom.avgStarRating >= 1 && (
								<h2 className="reviews-overview">
									★
									{Number(currentRoom.avgStarRating).toFixed(
										2
									)}
									{" · "}
									{Number(currentRoom.numReviews)} review(s)
								</h2>
							)}
							{currentRoom.avgStarRating < 1 && (
								<h2 className="reviews-overview">
									No Reviews Yet
								</h2>
							)}
							<div className="reviews">
								{currentRoomReviews.length > 0 &&
									typeof currentRoomReviews[0] === "object" &&
									currentRoomReviews.map((review) => {
										return (
											<Reviews
												review={review}
												key={review.id}
											></Reviews>
										);
									})}
							</div>
						</div>
					)}

					{sessionuser && sessionuser.id === currentRoom.ownerId && (
						<>
							<button
								onClick={deleteARoom}
								className="delete-btn"
							>
								Delete room
							</button>

							<NavLink
								to={`/rooms/${roomId}/edit`}
								className="edit"
							>
								<span>Edit room</span>
							</NavLink>
						</>
					)}
				</div>
			)}
		</div>
	);
};

export default SingleRoomInfo;
