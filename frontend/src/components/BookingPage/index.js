import { Link, useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

import CancelBookingModal from "./CancelBookingModal";
import EditBookingModal from "./EditBookingModal";

import { getAUsersBookings, getAUsersReviews } from "../../store/session";

import "./index.css";

const BookingPage = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const { bookingId } = useParams();

	const [booking, setBooking] = useState({});
	const [room, setRoom] = useState({});
	const [center, setCenter] = useState({});
	const [showModal, setShowModal] = useState(false);
	const [showEditModal, setShowEditModal] = useState(false);
	const [bookingDuration, setBookingDuration] = useState(0);

	const userBookings = useSelector((state) => state.session.bookings);
	const user = useSelector((state) => state.session.user);

	const { isLoaded } = useLoadScript({
		googleMapsApiKey: process.env.REACT_APP_NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
	});

	const getDate = (date) => {
		let newDate = new Date(date);
		return newDate.toDateString();
	};

	const isPast = (date, date2) => {
		const endDate = new Date(date).getTime();
		const today = new Date().getTime();
		return endDate < today;
	};

	const isCurrent = (start, end) => {
		start = new Date(start);
		end = new Date(end);
		const now = new Date().getTime();
		return start.getTime() < now && end.getTime() > now;
	};

	const checkReview = (reviews) => {
		for (let review of reviews) {
			if (review.userId === user.id) return true;
		}
		return false;
	};

	useEffect(() => {
		dispatch(getAUsersReviews());
		dispatch(getAUsersBookings());
	}, [dispatch]);

	useEffect(() => {
		let booking = null;
		if (userBookings.pastBookings) {
			if (userBookings.pastBookings[bookingId]) {
				booking = userBookings.pastBookings[bookingId];
			} else if (userBookings.currentBookings[bookingId]) {
				booking = userBookings.currentBookings[bookingId];
			} else if (userBookings.futureBookings[bookingId]) {
				booking = userBookings.futureBookings[bookingId];
			}
		}

		if (booking) {
			setBooking(booking);
			setRoom(booking.room);
			setCenter({
				lat: parseFloat(booking.room.lat),
				lng: parseFloat(booking.room.lng),
			});
		} else dispatch(getAUsersBookings());
	}, [dispatch, userBookings, bookingId]);

	useEffect(() => {
		let difference =
			new Date(booking.endDate).getTime() -
			new Date(booking.startDate).getTime();
		let duration = Math.ceil(difference / (1000 * 3600 * 24));
		setBookingDuration(duration);
	}, [booking]);

	useEffect(() => {
		if (showModal) {
			document.body.style.overflow = "hidden";
				document.body.style.height = "0px";
		} else {
			document.body.style.overflow = "unset";
		}
	}, [showModal]);
	
	return (
		<>
			{booking.room && (
				<div className="booking-page-main-container">
					<div className="booking-page-left">
						<div className="booking-page-location-details">
							<div className="booking-page-image">
								<h1 className="booking-page-title">
									Your stay at {room.owner.firstName}
									's place
								</h1>
								<div
									className="booking-page-back"
									onClick={() => history.push("/trips")}
								>
									Back
								</div>
								<img
									src={room.previewImage}
									className="booking-page-room-image"
									alt="booking preview"
								></img>
							</div>
							<div className="booking-page-location-bottom">
								<div className="booking-page-dates">
									<div className="booking-page-checkin">
										<h3>Check-in</h3>
										<div>{getDate(booking.startDate)}</div>
									</div>
									<div className="booking-page-checkout">
										<h3>Checkout</h3>
										<div>{getDate(booking.endDate)}</div>
									</div>
								</div>
								<div className="directions-cards">
									<a
										href={`https://www.google.com/maps/search/?api=1&query=${room.lat}%2C${room.lng}`}
										className="direction-card"
										target="_blank"
										rel="noreferrer"
									>
										Get directions
									</a>
									<Link
										to={`/rooms/${room.id}`}
										className="direction-card"
									>
										Show listing
									</Link>
								</div>
							</div>
						</div>

						<div className="booking-page-reservation-details">
							<h3>Reservation Details</h3>
							<div className="reservation-details-container">
								<div>Who's coming</div>
								<div className="reservation-details">
									<div>
										{" "}
										{booking.guests === 1
											? "1 Guest"
											: `${booking.guests} Guests`}
									</div>
									<div>{user.firstName}</div>
								</div>
							</div>
						</div>
						{!isCurrent(booking.startDate, booking.endDate) && (
							<div className="booking-page-actions">
								<h3>Action</h3>
								<CancelBookingModal
									showModal={showModal}
									setShowModal={setShowModal}
									booking={booking}
								></CancelBookingModal>
								<EditBookingModal
									showModal={showEditModal}
									setShowModal={setShowEditModal}
									booking={booking}
								></EditBookingModal>
								{!isPast(booking.startDate) ? (
									<>
										<div
											className="booking-action-cancel"
											onClick={() => setShowModal(true)}
										>
											Cancel booking
										</div>
										<div
											className="booking-action-edit"
											onClick={() =>
												setShowEditModal(true)
											}
										>
											Edit booking
										</div>
									</>
								) : (
									<>
										{checkReview(room.reviews) ? (
											<div className="booking-action-edit">
												<Link
													to={`/review-room/${booking.room.id}`}
													style={{
														width: "100%",
														display: "inline-block",
													}}
												>
													Edit review
												</Link>
											</div>
										) : (
											<div className="booking-action-edit">
												<Link
													to={`/review-room/${booking.room.id}`}
													style={{
														width: "100%",
														display: "inline-block",
													}}
												>
													Create review
												</Link>
											</div>
										)}
									</>
								)}
							</div>
						)}
						<div className="booking-page-directions">
							<h3 className="booking-page-directions-label">
								Getting there
							</h3>
							<div className="booking-page-address">
								<h4>Address</h4>
								{room.address}
								<br></br>
								{room.city}
								{", "}
								{room.state}
							</div>
							<div className="directions-cards">
								<div
									className="direction-card"
									onClick={async () => {
										await navigator.clipboard.writeText(
											`${room.address} ${room.city}, ${room.state}`
										);
										alert("Copied address to clipboard");
									}}
								>
									Copy address
								</div>
								<a
									href={`https://www.google.com/maps/search/?api=1&query=${room.lat}%2C${room.lng}`}
									className="direction-card"
									target="_blank"
									rel="noreferrer"
								>
									Get directions
								</a>
							</div>
						</div>
						{/* <div className="booking-page-rules">
							<h3>Where you're staying</h3>
							<h4>House Rules</h4>
							{room.rules && room.rules.length > 0 ? (
								room.rules.split("&").map((rule) => {
									return <div key={rule}>{rule}</div>;
								})
							) : (
								<div>No rules listed</div>
							)}
						</div> */}
						{/* <div className="booking-page-hosted">
							<h3>Hosted by {room.owner.firstName}</h3>
							<div>
								<h4>About your host</h4>
								<p>{room.owner.description}</p>
							</div>
						</div> */}
						<div className="booking-page-payment">
							<h3>Payment info</h3>
							<div>
								<h4>Total cost</h4>
								{/* Adds price of room with arbitrary fees */}
								<div>
									$
									{booking.room.price * bookingDuration +
										57 * bookingDuration}{" "}
									for {bookingDuration}{" "}
									{bookingDuration === 1 ? "night" : "nights"}
								</div>
							</div>
						</div>
					</div>
					<div className="booking-page-right">
						{isLoaded && (
							<>
								<GoogleMap
									zoom={15}
									center={center}
									mapContainerClassName="map"
								>
									<Marker position={center}></Marker>
								</GoogleMap>
							</>
						)}
					</div>
				</div>
			)}
		</>
	);
};

export default BookingPage;
