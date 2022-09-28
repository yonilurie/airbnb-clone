import { Link, useParams, useHistory } from "react-router-dom";
import { useSelector , useDispatch} from "react-redux";
import { useEffect, useState } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";



import "./index.css";
import CancelBookingModal from "./CancelBookingModal";
import { getAUsersBookings } from "../../store/session";

const BookingPage = () => {
	const dispatch = useDispatch()
	const history = useHistory();
	const { bookingId } = useParams();

	const [booking, setBooking] = useState({});
	const [room, setRoom] = useState({});
	const [center, setCenter] = useState({});
	const [showModal, setShowModal] = useState(false);

	const userBookings = useSelector((state) => state.session.bookings);
	const user = useSelector((state) => state.session.user);

	const { isLoaded } = useLoadScript({
		googleMapsApiKey: process.env.REACT_APP_NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
	});

	useEffect(() => {
		if (userBookings[bookingId]) {
			setBooking(userBookings[bookingId]);
			setRoom(userBookings[bookingId].room);
			setCenter({
				lat: parseFloat(userBookings[bookingId].room.lat),
				lng: parseFloat(userBookings[bookingId].room.lng),
			});
		} else {
			dispatch(getAUsersBookings())
		}
	}, [userBookings]);

	const getDate = (date) => {
		const newDate = new Date(date);
		return newDate.toDateString().split(" ").slice(0, 4).join(" ");
	};

	const isPast = (date) => {
		const endDate = new Date(date).getTime();
		const today = new Date().getTime();
		return endDate < today;
	};

	const checkReview = (reviews) => {
		for (let review of reviews) {
			if (review.userId === user.id) return true;
		}
		return false;
	};

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
									<div> 1 Guest</div>
									<div>{user.firstName}</div>
								</div>
							</div>
						</div>
						<div className="booking-page-actions">
							<h3>Action</h3>
							<CancelBookingModal
								showModal={showModal}
								setShowModal={setShowModal}
								booking={booking}
							></CancelBookingModal>
							{!isPast(booking.startDate) ? (
								<>
									<div
										className="booking-action-cancel"
										onClick={() => setShowModal(true)}
									>
										Cancel booking
									</div>
									<div className="booking-action-edit">
										Edit booking
									</div>
								</>
							) : (
								<>
									{checkReview(room.reviews) ? (
										<Link
											to={`/review-room/${booking.room.id}`}
											className="booking-action-review"
										>
											Edit review
										</Link>
									) : (
										<Link
											to={`/review-room/${booking.room.id}`}
											className="booking-action-review"
										>
											Create review
										</Link>
									)}
								</>
							)}
						</div>
						<div className="booking-page-directions">
							<h3>Getting there</h3>
							<div>
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
								>
									Get directions
								</a>
							</div>
						</div>
						<div className="booking-page-rules">
							<h3>Where you're staying</h3>
							<h4>House Rules</h4>
							<div>No rules listed</div>
						</div>
						<div className="booking-page-hosted">
							<h3>Hosted by {room.owner.firstName}</h3>
							<div>
								<h4>About your host</h4>
								<div>
									This is where the owners description will
									show up
								</div>
							</div>
						</div>
						<div className="booking-page-payment">
							<h3>Payment info</h3>
							<div>
								<h4>Total cost</h4>
								<div>$999.99 USD</div>
							</div>
						</div>
						<div className="booking-page-help"></div>
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
