import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { deleteBooking } from "../../../store/session";

const Booking = ({ booking }) => {
	const session = useSelector((state) => state.session);

	const bookingStart = new Date(booking.startDate).toString().split(" ");
	const bookingEnd = new Date(booking.endDate).toString().split(" ");
	const [
		startDay,
		startMonth,
		startDate,
		startYear,
		startTime,
	] = bookingStart;
	const [endDay, endMonth, endDate, endYear, endTime] = bookingEnd;

	let month;
	let duration;
	let year;
	//Account for trip overlapping months
	if (startMonth === endMonth) month = startMonth;
	else month = `${startMonth}-${endMonth} `;
	//Account for trip overlapping years
	if (startYear === endYear) year = startYear;
	else year = `${startYear}-${endYear}`;
	//Set the days of the booking
	duration = `${startDate}-${endDate},`;

	return (
		<div className="single-booking-container">
			<NavLink to={`/trips/${booking.id}`} className="booking">
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
					<div className="duration">{`${month} ${duration} ${year}`}</div>
				</div>
			</NavLink>
		</div>
	);
};

export default Booking;
