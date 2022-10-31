import { Link, useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

import CancelBookingModal from "./JS/CancelBookingModal";
import EditBookingModal from "./JS/EditBookingModal";
import ReviewModal from "../Review/JS/ReviewModal";

import { getAUsersBookings, getAUsersReviews } from "../../store/session";

import "./CSS/index.css";
import BookingLocationDetails from "./JS/BookingLocationDetails";
import ReservationDetails from "./JS/ReservationDetails";
import BookingPageDirections from "./JS/BookingPageDirections";
import BookingActions from "./JS/BookingActions";

const BookingPage = () => {
	const dispatch = useDispatch();
	const { bookingId } = useParams();

	const [booking, setBooking] = useState({});
	const [room, setRoom] = useState({});
	const [center, setCenter] = useState({});
	const [showModal, setShowModal] = useState(false);
	const [showEditModal, setShowEditModal] = useState(false);
	const [showReviewModal, setShowReviewModal] = useState(false);
	const [bookingDuration, setBookingDuration] = useState(0);
	const [hasReview, setHasReview] = useState(false);

	const userBookings = useSelector((state) => state.session.bookings);
	const user = useSelector((state) => state.session.user);
	const reviews = useSelector((state) => state.session.reviews);

	const { isLoaded } = useLoadScript({
		googleMapsApiKey: process.env.REACT_APP_NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
	});

	const isCurrent = (start, end) => {
		start = new Date(start);
		end = new Date(end);
		const now = new Date().getTime();
		return start.getTime() < now && end.getTime() > now;
	};

	const checkReview = (reviews) => {
		for (let review of reviews) {                
			if (review.userId === user.id) return review;
		}
		return false;
	};

	useEffect(() => {
		dispatch(getAUsersReviews());
		dispatch(getAUsersBookings());
	}, [dispatch]);

	useEffect(() => {
		let res = checkReview(Object.values(reviews));
		setHasReview(res);
	}, [reviews]);

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
		let duration = Math.ceil(difference / (1000 * 3600 * 24)) - 1;
		setBookingDuration(duration);
	}, [booking]);

	return (
		<>
			{booking.room && (
				<div className="booking-page-main-container">
					<ReviewModal
						review={hasReview}
						showReviewModal={showReviewModal}
						setShowReviewModal={setShowReviewModal}
						roomId={room.id}
					></ReviewModal>
					<div className="booking-page-left">
						<BookingLocationDetails
							room={room}
							booking={booking}
						></BookingLocationDetails>
						<ReservationDetails
							booking={booking}
							user={user}
						></ReservationDetails>
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

								<BookingActions
									booking={booking}
									hasReview={hasReview}
									showModal={showModal}
									setShowModal={setShowModal}
									setShowReviewModal={setShowReviewModal}
									setShowEditModal={setShowEditModal}
								></BookingActions>
							</div>
						)}
						<BookingPageDirections
							room={room}
						></BookingPageDirections>
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
