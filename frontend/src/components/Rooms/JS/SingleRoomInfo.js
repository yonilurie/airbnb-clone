import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";

import { getRoomInfo, getARoomsBookings } from "../../../store/CurrentRoom";
import { deleteARoom, getMyRoomsData } from "../../../store/session";
import Reviews from "./Reviews";

import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

import "../CSS/SingleRoomInfo.css";
import ReviewsModal from "./ReviewsModal";
import BookingCard from "./BookingCard";

const SingleRoomInfo = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const [showModal, setShowModal] = useState(false);
	const [center, setCenter] = useState({});

	const sessionuser = useSelector((state) => state.session.user);
	const currentRoom = useSelector((state) => state.currentRoom);

	const { roomId } = useParams();

	const [isDisplayed, setIsDisplayed] = useState(false);

	//Get room info, images, and reviews
	useEffect(() => {
		dispatch(getRoomInfo(Number(roomId)));
		dispatch(getARoomsBookings(Number(roomId)));
	}, [dispatch, roomId]);

	useEffect(() => {
		setCenter({
			lat: currentRoom.lat,
			lng: currentRoom.lng,
		});
	}, [currentRoom]);

	useEffect(() => {
		if (showModal) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "unset";
		}
	}, [showModal]);

	useEffect(() => {
		if (currentRoom.id !== Number(roomId)) {
			const timeout = setTimeout(() => {
				setIsDisplayed(true);
			}, 300);
			return () => clearTimeout(timeout);
		} else {
			setIsDisplayed(true);
		}
	}, []);

	if (isNaN(Number(roomId))) history.push("/");

	if (currentRoom.errors) {
		history.push("/");
	}
	//Will delete a room an redirect user to /my-rooms page
	const deletedRoom = () => {
		dispatch(deleteARoom(roomId));
		dispatch(getMyRoomsData());
		history.push("/my-rooms");
	};

	if (currentRoom.name) {
		document.title = `${currentRoom.name}`;
	}

	const { isLoaded } = useLoadScript({
		googleMapsApiKey: process.env.REACT_APP_NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
	});

	return (
		<div className="content-container">
			<ReviewsModal
				showModal={showModal}
				setShowModal={setShowModal}
				currentRoom={currentRoom}
			></ReviewsModal>

			{!isDisplayed && (
				<div className="placeholder-container">
					<div className="placeholder-loading-section-1">
						<div className="loading-strip-1"></div>
						<div className="loading-strip-2"></div>
					</div>
					<div className="placeholder-loading-section-2">
						<div className="placeholder-loading-box-1-container">
							<div className="loading-box-1"></div>
						</div>
						<div className="placeholder-loading-box-2-container">
							<div className="loading-box-2"></div>
							<div
								className="loading-box-2"
								style={{ borderTopRightRadius: "12px" }}
							></div>
							<div className="loading-box-2"></div>
							<div
								className="loading-box-2"
								style={{ borderBottomRightRadius: "12px" }}
							></div>
						</div>
					</div>

					<div className="placeholder-loading-section-3">
						<div className="loading-strip-3"></div>
						<div className="loading-strip-4"></div>
					</div>
				</div>
			)}

			{isDisplayed &&
				currentRoom &&
				Number(currentRoom.id) === Number(roomId) && (
					<div className="room-content">
						<div>
							<div className="room-details">
								<h1 className="room-name">
									{currentRoom.name}
								</h1>
								{currentRoom.avgStarRating >= 1 && (
									<div className="room-reviews-and-location">
										★
										{Number(
											currentRoom.avgStarRating
										).toFixed(2)}
										{" · "}
										<span
											id="reviews-modal-link"
											onClick={() => setShowModal(true)}
										>
											{Number(
												Object.values(
													currentRoom.reviews
												).length
											)}{" "}
											review(s)
										</span>
										{" · "}
										{currentRoom.city}, {currentRoom.state},{" "}
										{currentRoom.country}
									</div>
								)}
								{currentRoom.avgStarRating < 1 && (
									<div className="room-reviews-and-location">
										No Reviews Yet {currentRoom.city},{" "}
										{currentRoom.state},{" "}
										{currentRoom.country}
									</div>
								)}
							</div>

							<div className="room-images">
								{currentRoom.previewImage && (
									<img
										src={currentRoom.previewImage}
										alt="preview"
										className="main-image"
									></img>
								)}
							</div>
						</div>
						<div className="room-details-container">
							<div className="room-owner-and-description">
								<>
									<h2>
										Entire home hosted by{" "}
										{currentRoom.owner.firstName}
									</h2>
								</>

								<div className="description-container">
									<div className="description">
										{currentRoom.description}
									</div>
								</div>
							</div>
							{sessionuser &&
								sessionuser.id !== currentRoom.owner.id && (
									<BookingCard
										currentRoom={currentRoom}
										setShowModal={setShowModal}
									/>
								)}
							{sessionuser &&
								sessionuser.id === currentRoom.ownerId && (
									<div className="button-container">
										<button
											className="edit-btn"
											style={{ marginRight: ".5rem" }}
											onClick={() =>
												history.push(
													`/rooms/${roomId}/edit`
												)
											}
										>
											Edit room
										</button>
										<button
											onClick={deletedRoom}
											className="delete-btn"
										>
											Delete room
										</button>
									</div>
								)}
						</div>
						{Object.values(currentRoom.reviews).length > 0 && (
							<div className="reviews-container">
								{currentRoom.avgStarRating >= 1 && (
									<h2 className="reviews-overview">
										★
										{Number(
											currentRoom.avgStarRating
										).toFixed(2)}
										{" · "}
										{Number(
											Object.values(currentRoom.reviews)
												.length
										)}{" "}
										review(s)
									</h2>
								)}

								<div className="reviews">
									{Object.values(currentRoom.reviews).length >
										0 &&
										typeof Object.values(
											currentRoom.reviews
										)[0] === "object" &&
										Object.values(currentRoom.reviews).map(
											(review) => {
												return (
													<Reviews
														review={review}
														key={review.id}
													></Reviews>
												);
											}
										)}

									{!Object.values(currentRoom.reviews)
										.length && (
										<div className="no-reviews-placeholder">
											No Reviews
										</div>
									)}
								</div>
							</div>
						)}
						{currentRoom.avgStarRating < 1 && (
							<h2 className="reviews-overview">No Reviews Yet</h2>
						)}
						<div className="room-page-map">
							<h3>Where you'll be</h3>
							{isLoaded && (
								<>
									<GoogleMap
										zoom={15}
										center={center}
										mapContainerClassName="map-small"
									>
										<Marker position={center}></Marker>
									</GoogleMap>
								</>
							)}
						</div>
					</div>
				)}
		</div>
	);
};

export default SingleRoomInfo;
