import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";

import { getRoomInfo, getARoomsBookings } from "../../../store/CurrentRoom";

import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

import Reviews from "./Reviews";
import ReviewsModal from "./ReviewsModal";
import BookingCard from "./BookingCard";
import ImageModal from "./ImageModal";

import "../CSS/SingleRoomInfo.css";

const SingleRoomInfo = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const [showModal, setShowModal] = useState(false);
	const [center, setCenter] = useState({ lat: 0.0, lng: 0.0 });
	const [gallery, setGallery] = useState([]);
	const [galleryImage, setGalleryImage] = useState(0);
	const [showImageModal, setShowImageModal] = useState(false);

	const sessionuser = useSelector((state) => state.session.user);
	const currentRoom = useSelector((state) => state.currentRoom);

	const { roomId } = useParams();

	//Get room info, images, and reviews
	useEffect(() => {
		dispatch(getRoomInfo(Number(roomId)));
		dispatch(getARoomsBookings(Number(roomId)));
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

	useEffect(() => {
		if (showModal) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "unset";
		}
	}, [showModal]);

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

			{!currentRoom && (
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
						<div className="room-images-side">
							<div className="room-images-container">
								{currentRoom.images[1] ? (
									<img
										src={currentRoom.images[0].imageUrl}
										className="room-image-small"
									></img>
								) : (
									<div className="room-image-small-placeholder"></div>
								)}
								{currentRoom.images[1] ? (
									<img
										src={currentRoom.images[1].imageUrl}
										className="room-image-small"
									></img>
								) : (
									<div className="room-image-small-placeholder"></div>
								)}
							</div>
							<div
								className="room-images-container"
								style={{
									paddingLeft: "10px",
								}}
							>
								{currentRoom.images[2] ? (
									<img
										src={currentRoom.images[2].imageUrl}
										className="room-image-small top-right"
									></img>
								) : (
									<div className="room-image-small-placeholder top-right"></div>
								)}
								{currentRoom.images[3] ? (
									<img
										src={currentRoom.images[3].imageUrl}
										className="room-image-small bottom-right"
									></img>
								) : (
									<div
										className="room-image-small-placeholder bottom-right"
										// style={{
										// 	marginTop: "16px",
										// }}
									></div>
								)}
							</div>
						</div>
					</div>
					{/* </div> */}
					<div className="room-details-container">
						<div className="room-owner-and-description">
							<>
								<h2>
									Entire home hosted by{" "}
									{sessionuser &&
									currentRoom.owner.id === sessionuser.id
										? "You"
										: currentRoom.owner.firstName}
								</h2>
							</>

							<div className="description-container">
								<div className="description">
									{currentRoom.description}
								</div>
							</div>
						</div>

						<BookingCard
							currentRoom={currentRoom}
							setShowModal={setShowModal}
						/>
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
