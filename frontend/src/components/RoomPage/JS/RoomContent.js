import RoomGallery from "./RoomGallery";
import BookingCard from "./BookingCard.js";
import Reviews from "./Reviews";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

import LearnMore from "./LearnMore.js";
const RoomContent = ({ room, setShowModal }) => {
	const sessionuser = useSelector((state) => state.session.user);

	const [showLearnMore, setShowLearnMore] = useState(false);
	const [center, setCenter] = useState({ lat: 0.0, lng: 0.0 });
	const [gallery, setGallery] = useState([]);

	const { isLoaded } = useLoadScript({
		googleMapsApiKey: process.env.REACT_APP_NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
	});

	useEffect(() => {
		if (room) {
			let lat = parseFloat(room.lat);
			let lng = parseFloat(room.lng);
			if (!isNaN(lat) || !isNaN(lng)) {
				setCenter({
					lat,
					lng,
				});
			}
		}

		if (room.images) {
			let tempGallery = [room.previewImage];
			room.images.forEach((image) => {
				tempGallery.push(image.imageUrl);
			});
			setGallery(tempGallery);
		}
	}, [room]);

	return (
		<div className="room-content">
			<RoomGallery gallery={gallery}></RoomGallery>
			<div className="room-details">
				<h1 className="room-name">{room.name}</h1>
				{room.avgStarRating >= 1 && (
					<div className="room-reviews-and-location">
						★{Number(room.avgStarRating).toFixed(2)}
						{" · "}
						<span
							id="reviews-modal-link"
							onClick={() => setShowModal(true)}
						>
							{Object.values(room.reviews).length}{" "}
							{Object.values(room.reviews).length === 1
								? "review"
								: "reviews"}
						</span>
						{" · "}
						{room.city}, {room.state}, {room.country}
					</div>
				)}
				{room.avgStarRating < 1 && (
					<div className="room-reviews-and-location">
						No Reviews Yet {room.city}, {room.state}, {room.country}
					</div>
				)}
			</div>
			<div className="room-images">
				<div className="room-images-left">
					{room.previewImage && (
						<img
							src={room.previewImage}
							alt="preview"
							className="main-image"
						></img>
					)}
				</div>
				{room.images && (
					<div className="room-images-side">
						<div className="room-images-container">
							<img
								src={room.images[0].imageUrl}
								className="room-image-small"
								alt={room.images[0].imageUrl}
							></img>
							<img
								src={room.images[1].imageUrl}
								className="room-image-small"
								alt={room.images[1].imageUrl}
							></img>
						</div>
						<div
							className="room-images-container"
							style={{
								paddingLeft: "10px",
							}}
						>
							<img
								src={room.images[2].imageUrl}
								className="room-image-small top-right"
								alt={room.images[2].imageUrl}
							></img>
							<img
								src={room.images[3].imageUrl}
								className="room-image-small bottom-right"
								alt={room.images[3].imageUrl}
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
							room.owner.id === sessionuser.id
								? "You"
								: room.owner.firstName}
						</h2>
						<div>
							<span className="room-size-detail">
								{room.guests}
								{room.guests === 1 ? " guest" : " guests"}
							</span>
							{" · "}
							<span className="room-size-detail">
								{room.bedrooms}{" "}
								{room.bedrooms === 1 ? " bedroom" : " bedrooms"}
							</span>
							{" · "}
							<span className="room-size-detail">
								{room.beds} {room.beds === 1 ? " bed" : " beds"}
							</span>
							{" · "}
							<span className="room-size-detail">
								{room.baths}{" "}
								{room.baths === 1 ? "  bath" : "  baths"}
							</span>
						</div>
					</div>
					<div className="aircover-container-main">
						<img
							className="aircover-logo"
							src="https://a0.muscache.com/im/pictures/54e427bb-9cb7-4a81-94cf-78f19156faad.jpg"
							alt="aircover"
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
						<div className="description">{room.description}</div>
					</div>
					{room.amenities.length > 0 ? (
						<div className="room-amenities-container">
							<h2 className="room-detail-title">
								What this place offers
							</h2>
							<div className="room-amenities">
								{room.amenities.map((amenity) => (
									<div className="room-amenity">
										• {amenity.type}
									</div>
								))}
							</div>
						</div>
					) : (
						<div className="room-amenities-container">
							<h2 className="room-detail-title">
								What this place offers
							</h2>
							<div className="room-amenities">
								The owner has not provided any amenities
							</div>
						</div>
					)}
				</div>

				{sessionuser && room.owner.id !== sessionuser.id && (
					<BookingCard
						currentRoom={room}
						setShowModal={setShowModal}
					/>
				)}

				{!sessionuser && (
					<BookingCard
						currentRoom={room}
						setShowModal={setShowModal}
					/>
				)}

				{sessionuser && room.owner.id === sessionuser.id && (
					<div className="owner-bookings">
						<h2 className="room-detail-title">Bookings</h2>
						{room.bookings &&
							room.bookings.length > 0 &&
							Object.values(room.bookings).map((booking) => {
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
							})}
						{room.bookings && !room.bookings.length && (
							<div>No nights booked yet</div>
						)}
					</div>
				)}
			</div>
			{Object.values(room.reviews).length > 0 && (
				<div className="reviews-container">
					{room.avgStarRating >= 1 && (
						<h2 className="reviews-overview">
							★{Number(room.avgStarRating).toFixed(2)}
							{" · "}
							{Object.values(room.reviews).length}{" "}
							{Object.values(room.reviews).length === 1
								? "review"
								: "reviews"}
						</h2>
					)}
					<div className="reviews">
						{Object.values(room.reviews).length > 0 &&
						typeof Object.values(room.reviews)[0] === "object" ? (
							Object.values(room.reviews).map((review) => {
								return (
									<Reviews
										review={review}
										key={review.id}
									></Reviews>
								);
							})
						) : (
							<div className="no-reviews-placeholder">
								No Reviews
							</div>
						)}
					</div>
				</div>
			)}
			{room.avgStarRating < 1 && (
				<div className="reviews-container">
					<h2 className="reviews-overview">No Reviews Yet</h2>
				</div>
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
