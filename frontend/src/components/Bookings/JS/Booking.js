import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const Booking = ({ booking, reviewDisabled }) => {
	const session = useSelector((state) => state.session);

	let hasReview;
	if (session.reviews) {
		hasReview = Object.values(session.reviews).find(
			(review) => review.roomId === booking.roomId
		);
	}

	let buttonMsg;
	if (hasReview) buttonMsg = "Edit review";
	else if (!hasReview) buttonMsg = "Add review";

	const bookingStart = new Date(booking.startDate);
	const [
		startDay,
		startMonth,
		startDate,
		startYear,
		startTime,
	] = bookingStart.toString().split(" ");
	const bookingEnd = new Date(booking.endDate);
	const [
		endDay,
		endMonth,
		endDate,
		endYear,
		endTime,
	] = bookingEnd.toString().split(" ");
	let bookingDuration = ["month", "duration", "year"];

	//Account for trip overlapping months
	if (startMonth === endMonth) {
		bookingDuration[0] = startMonth;
	} else {
		const start = startMonth;
		const end = endMonth;
		bookingDuration[0] = `${start}-${end} `;
	}
	//Account for trip overlapping years
	if (startYear === endYear) {
		bookingDuration[2] = startYear;
	} else {
		bookingDuration[2] = `${startYear}-${endYear}`;
	}
	//Set the days of the booking
	bookingDuration[1] = `${startDate}-${endDate},`;

	return (
		<div className="single-booking-container">
			<NavLink to={`/rooms/${booking.room.id}`} className="booking">
				<div className="booking-image">
					<img
						src={booking.room.previewImage}
						alt="preview"
						className="preview-image"
					></img>
				</div>
				<div className="booking-info">
					<div className="city">{booking.room.city}</div>
					<div className="owner">
						Hosted by {booking.room.owner.firstName}
					</div>
					<div className="duration">{bookingDuration.join(" ")}</div>
				</div>
			</NavLink>
			{!reviewDisabled && (
				<NavLink to={`/review-room/${booking.room.id}`}>
					<button className="review-btn">{buttonMsg}</button>
				</NavLink>
			)}
		</div>
	);
};

export default Booking;
