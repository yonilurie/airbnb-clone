import RoomGallery from "./RoomGallery";
import BookingCard from "./BookingCard.js";
import Reviews from "./Reviews";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

import LearnMore from "./LearnMore.js";
const RoomContent = ({ currentRoom,  setShowModal }) => {
	const sessionuser = useSelector((state) => state.session.user);

	const [showLearnMore, setShowLearnMore] = useState(false);
	const [center, setCenter] = useState({ lat: 0.0, lng: 0.0 });
	const [gallery, setGallery] = useState([]);

	const { isLoaded } = useLoadScript({
		googleMapsApiKey: process.env.REACT_APP_NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
	});

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
    
	return (
		<div className="room-content">
			<RoomGallery gallery={gallery}></RoomGallery>
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
							{Number(Object.values(currentRoom.reviews).length)}{" "}
							{Number(
								Object.values(currentRoom.reviews).length
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
						No Reviews Yet {currentRoom.city}, {currentRoom.state},{" "}
						{currentRoom.country}
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
								{currentRoom.beds === 1 ? " bed" : " beds"}
							</span>
							{" · "}
							<span className="room-size-detail">
								{currentRoom.baths}{" "}
								{currentRoom.baths === 1 ? "  bath" : "  baths"}
							</span>
						</div>
					</div>
					<div className="aircover-container-main">
						<img
							className="aircover-logo"
							src="https://a0.muscache.com/im/pictures/54e427bb-9cb7-4a81-94cf-78f19156faad.jpg"
						></img>
						<div className="aircover-description">
							Every booking includes free protection from Host
							cancellations, listing inaccuracies, and other
							issues like trouble checking in.
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
							<h2 className="room-detail-title">Bookings</h2>
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
							★{Number(currentRoom.avgStarRating).toFixed(2)}
							{" · "}
							{Object.values(currentRoom.reviews).length}{" "}
							{Object.values(currentRoom.reviews).length === 1
								? "review"
								: "reviews"}
						</h2>
					)}
					<div className="reviews">
						{Object.values(currentRoom.reviews).length > 0 &&
							typeof Object.values(currentRoom.reviews)[0] ===
								"object" &&
							Object.values(currentRoom.reviews).map((review) => {
								return (
									<Reviews
										review={review}
										key={review.id}
									></Reviews>
								);
							})}
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
	);
};

export default RoomContent;
