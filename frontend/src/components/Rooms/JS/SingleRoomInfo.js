import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";

import { getRoomInfo, getARoomsBookings } from "../../../store/CurrentRoom";

import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

import Reviews from "./Reviews";
import ReviewsModal from "./ReviewsModal";
import BookingCard from "./BookingCard";
import ImageModal from "./ImageModal";
import LearnMore from "./LearnMore";

import "../CSS/SingleRoomInfo.css";

const SingleRoomInfo = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const [showModal, setShowModal] = useState(false);
	const [center, setCenter] = useState({ lat: 0.0, lng: 0.0 });
	const [gallery, setGallery] = useState([]);
	const [galleryImage, setGalleryImage] = useState(0);
	const [showImageModal, setShowImageModal] = useState(false);
	const [showLearnMore, setShowLearnMore] = useState(false);
	const sessionuser = useSelector((state) => state.session.user);
	const currentRoom = useSelector((state) => state.currentRoom);

	const { roomId } = useParams();

	//Get room info, images, and reviews
	useEffect(() => {
		dispatch(getRoomInfo(Number(roomId))).then(() =>
			dispatch(getARoomsBookings(Number(roomId)))
		);
	}, [dispatch, roomId]);

	useEffect(() => {
		if (currentRoom) {
			let lat = parseFloat(currentRoom.lat);
			let lng = parseFloat(currentRoom.lng);
			if (!isNaN(lat) || !isNaN(lng)) {
				setCenter({
					lat,
					lng,
				});
			}
		}

		if (currentRoom.images) {
			let tempGallery = [currentRoom.previewImage];
			currentRoom.images.forEach((image) => {
				tempGallery.push(image.imageUrl);
			});
			setGallery(tempGallery);
		}
	}, [currentRoom]);

	if (isNaN(Number(roomId))) history.push("/");
	if (currentRoom.errors) history.push("/");
	if (currentRoom.name) document.title = `${currentRoom.name}`;

	const { isLoaded } = useLoadScript({
		googleMapsApiKey: process.env.REACT_APP_NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
	});

	const setGalleryIndex = (dir) => {
		if (dir === "left" && galleryImage !== 0) {
			setGalleryImage((galleryImage) => galleryImage - 1);
		}
		if (dir === "right" && galleryImage !== gallery.length - 1) {
			setGalleryImage((galleryImage) => galleryImage + 1);
		}
	};
	return (
		<div className="content-container">
			<ReviewsModal
				showModal={showModal}
				setShowModal={setShowModal}
				currentRoom={currentRoom}
			></ReviewsModal>
			{!currentRoom.id && (
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
			{currentRoom && Number(currentRoom.id) === Number(roomId) && (
				<div className="room-content">
					<div className="gallery">
						<img
							className="gallery-img"
							src={gallery[galleryImage]}
							onClick={() => setShowImageModal(true)}
						></img>
						<ImageModal
							showImageModal={showImageModal}
							setShowImageModal={setShowImageModal}
							image={gallery[galleryImage]}
						></ImageModal>
						{gallery.length > 1 && (
							<>
								<div
									className="gallery-nav left"
									onClick={() => setGalleryIndex("left")}
								>
									{"<"}
								</div>
								<div
									className="gallery-nav right"
									onClick={() => setGalleryIndex("right")}
								>
									{">"}
								</div>
							</>
						)}
					</div>
					<div className="room-details">
						<h1 className="room-name">{currentRoom.name}</h1>
						{currentRoom.avgStarRating >= 1 && (
							<div className="room-reviews-and-location">
								★{Number(currentRoom.avgStarRating).toFixed(2)}
								{" · "}
								<span
									id="reviews-modal-link"
									onClick={() => setShowModal(true)}
								>
									{Number(
										Object.values(currentRoom.reviews)
											.length
									)}{" "}
									{Number(
										Object.values(currentRoom.reviews)
											.length
									) === 1
										? "review"
										: "reviews"}
								</span>
								{" · "}
								{currentRoom.city}, {currentRoom.state},{" "}
								{currentRoom.country}
							</div>
						)}
						{currentRoom.avgStarRating < 1 && (
							<div className="room-reviews-and-location">
								No Reviews Yet {currentRoom.city},{" "}
								{currentRoom.state}, {currentRoom.country}
							</div>
						)}
					</div>
					<div className="room-images">
						<div className="room-images-left">
							{currentRoom.previewImage && (
								<img
									src={currentRoom.previewImage}
									alt="preview"
									className="main-image"
								></img>
							)}
						</div>
						{currentRoom.images && (
							<div className="room-images-side">
								<div className="room-images-container">
									<img
										src={currentRoom.images[0].imageUrl}
										className="room-image-small"
									></img>
									<img
										src={currentRoom.images[1].imageUrl}
										className="room-image-small"
									></img>
								</div>
								<div
									className="room-images-container"
									style={{
										paddingLeft: "10px",
									}}
								>
									<img
										src={currentRoom.images[2].imageUrl}
										className="room-image-small top-right"
									></img>
									<img
										src={currentRoom.images[3].imageUrl}
										className="room-image-small bottom-right"
									></img>
								</div>
							</div>
						)}
					</div>
					<div className="room-details-container">
						<div className="room-owner-and-description">
							<div className="room-size">
								<h2 className="room-hosted-by">
									Entire home hosted by{" "}
									{sessionuser &&
									sessionuser.id &&
									currentRoom.owner.id === sessionuser.id
										? "You"
										: currentRoom.owner.firstName}
								</h2>
								<div>
									<span className="room-size-detail">
										{currentRoom.guests}
										{currentRoom.guests === 1
											? " guest"
											: " guests"}
									</span>
									{" · "}
									<span className="room-size-detail">
										{currentRoom.bedrooms}{" "}
										{currentRoom.bedrooms === 1
											? " bedroom"
											: " bedrooms"}
									</span>
									{" · "}
									<span className="room-size-detail">
										{currentRoom.beds}{" "}
										{currentRoom.beds === 1
											? " bed"
											: " beds"}
									</span>
									{" · "}
									<span className="room-size-detail">
										{currentRoom.baths}{" "}
										{currentRoom.baths === 1
											? "  bath"
											: "  baths"}
									</span>
								</div>
							</div>
							{/* <div className="room-check-in-container">
								<div className="room-check-in-single">
									<svg
										viewBox="0 0 32 32"
										xmlns="http://www.w3.org/2000/svg"
										aria-hidden="true"
										role="presentation"
										focusable="false"
										style={{
											display: " block",
											height: "24px",
											width: " 24px",
											fill: "currentcolor",
										}}
									>
										<path d="m24.3334 1.66675c1.0543745 0 1.9181663.81587127 1.9945143 1.85073677l.0054857.14926323-.00065 24.666 3.00065.00075v2h-26.66665v-2l3-.00075v-24.666c0-1.05436681.81587301-1.91816558 1.850737-1.99451429l.149263-.00548571zm-4.00065 2h-12.666l-.00075 24.66625 12.66675-.00025zm4.00065 0h-2.00065v24.666l2.00025.00025zm-7.0001 11.00002c.7363778 0 1.33333.5969522 1.33333 1.33333s-.5969522 1.33333-1.33333 1.33333-1.33333-.5969522-1.33333-1.33333.5969522-1.33333 1.33333-1.33333z"></path>
									</svg>
									<div className="check-in-text-container">
										<div className="check-in-text-large">
											Self check-in
										</div>
										<div className="check-in-text-small">
											Check yourself in with the keypad.
										</div>
									</div>
								</div>
								<div className="room-check-in-single">
									<svg
										viewBox="0 0 32 32"
										xmlns="http://www.w3.org/2000/svg"
										aria-hidden="true"
										role="presentation"
										focusable="false"
										style={{
											display: " block",
											height: "24px",
											width: " 24px",
											fill: "currentcolor",
										}}
									>
										<path d="m16 17c3.8659932 0 7 3.1340068 7 7s-3.1340068 7-7 7-7-3.1340068-7-7 3.1340068-7 7-7zm0 2c-2.7614237 0-5 2.2385763-5 5s2.2385763 5 5 5 5-2.2385763 5-5-2.2385763-5-5-5zm9.6666667-18.66666667c1.0543618 0 1.9181651.81587779 1.9945142 1.85073766l.0054858.14926234v6.38196601c0 .70343383-.3690449 1.35080636-.9642646 1.71094856l-.1413082.0779058-9.6666667 4.8333334c-.5067495.2533747-1.0942474.2787122-1.6171466.0760124l-.1717078-.0760124-9.66666666-4.8333334c-.62917034-.3145851-1.04315599-.93418273-1.09908674-1.62762387l-.00648607-.16123049v-6.38196601c0-1.05436179.81587779-1.91816512 1.85073766-1.99451426l.14926234-.00548574zm0 2h-19.33333337v6.38196601l9.66666667 4.83333336 9.6666667-4.83333336z"></path>
									</svg>
									<div className="check-in-text-container">
										<div className="check-in-text-large">
											{currentRoom.owner.firstName} is a
											Superhost
										</div>
										<div className="check-in-text-small">
											Superhosts are experienced, highly
											rated hosts who are committed to
											providing great stays for guests.
										</div>
									</div>
								</div>
							</div> */}
							<div className="aircover-container-main">
								<img
									className="aircover-logo"
									src="https://a0.muscache.com/im/pictures/54e427bb-9cb7-4a81-94cf-78f19156faad.jpg"
								></img>
								<div className="aircover-description">
									Every booking includes free protection from
									Host cancellations, listing inaccuracies,
									and other issues like trouble checking in.
								</div>
								<div
									className="aircover-learn-more"
									onClick={() => setShowLearnMore(true)}
								>
									Learn more
								</div>
								{showLearnMore && (
									<LearnMore
										setShowLearnMore={setShowLearnMore}
									></LearnMore>
								)}
							</div>
							<div className="description-container">
								<div className="description">
									{currentRoom.description}
								</div>
							</div>
							<div className="room-amenities-container">
								<h2 className="room-detail-title">
									What this place offers
								</h2>
								<div className="room-amenities">
									{currentRoom.amenities
										.split("&")
										.slice(0, -1)
										.map((amenity) => (
											<div className="room-amenity">
												{amenity}
											</div>
										))}
								</div>
							</div>
						</div>

						{currentRoom &&
							sessionuser &&
							currentRoom.owner.id !== sessionuser.id && (
								<BookingCard
									currentRoom={currentRoom}
									setShowModal={setShowModal}
								/>
							)}
						{currentRoom &&
							sessionuser &&
							currentRoom.owner.id === sessionuser.id && (
								<div className="owner-bookings">
									<h2 className="room-detail-title">
										Bookings
									</h2>
									{currentRoom.bookings &&
										Object.values(currentRoom.bookings).map(
											(booking) => {
												return (
													<div
														className="owner-booking"
														key={booking.id}
													>
														<div>
															{new Date(
																booking.startDate
															).toDateString()}
														</div>
														{" - "}
														<div>
															{new Date(
																booking.endDate
															).toDateString()}
														</div>
													</div>
												);
											}
										)}
								</div>
							)}
					</div>
					{Object.values(currentRoom.reviews).length > 0 && (
						<div className="reviews-container">
							{currentRoom.avgStarRating >= 1 && (
								<h2 className="reviews-overview">
									★
									{Number(currentRoom.avgStarRating).toFixed(
										2
									)}
									{" · "}
									{Number(
										Object.values(currentRoom.reviews)
											.length
									)}{" "}
									{Number(
										Object.values(currentRoom.reviews)
											.length
									) === 1
										? "review"
										: "reviews"}
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
								{!Object.values(currentRoom.reviews).length && (
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
							<GoogleMap
								zoom={15}
								center={center}
								mapContainerClassName="map-small"
							>
								<Marker position={center}></Marker>
							</GoogleMap>
						)}
					</div>
				</div>
			)}
		</div>
	);
};

export default SingleRoomInfo;
