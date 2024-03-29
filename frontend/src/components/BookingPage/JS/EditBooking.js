import { useDispatch } from "react-redux";
import { useState } from "react";
import Calendar from "react-calendar";
import Errors from "../../Errors";
import { getAUsersBookings, editBooking } from "../../../store/session";

const EditBooking = ({ booking, setShowModal }) => {
	const dispatch = useDispatch();

	const [bookingStartDate, setBookingStartDate] = useState(booking.startDate);
	const [bookingEndDate, setBookingEndDate] = useState(booking.endDate);
	const [validationErrors, setValidationErrors] = useState([]);

	const checkInvalidTile = ({ activeStartDate, date, view }) => {
		for (let roomBooking of booking.room.bookings) {
			let currStart = new Date(roomBooking.startDate).getTime();
			let currEnd = new Date(roomBooking.endDate).getTime();
			let currTime = date.getTime();
			if (
				currTime <= currEnd &&
				currTime >= currStart &&
				roomBooking.id !== booking.id
			)
				return true;
		}
		return false;
	};

	//Handle user input in calendar
	const calendarOnChange = (e) => {
		let start = new Date(e[0]);
		let end = new Date(e[1]);
		if (
			start.toLocaleString().slice(0, 10) ===
			end.toLocaleString().slice(0, 10)
		) {
			return setValidationErrors(["Must book at least one night"]);
		}
		setBookingStartDate(e[0]);
		setBookingEndDate(e[1]);
	};

	//Handle edit booking submission
	const handleSubmit = async (e) => {
		e.preventDefault();
		if (
			bookingStartDate === booking.startDate &&
			bookingEndDate === booking.endDate
		) {
			return setValidationErrors(["Must change dates"]);
		}

		const data = await dispatch(
			editBooking({
				startDate: bookingStartDate,
				endDate: bookingEndDate,
				bookingId: booking.id,
				roomId: booking.room.id,
			})
		);

		if (data.errors) {
			setValidationErrors([data.errors.error]);
		} else {
			setValidationErrors(["Successfully booked!"]);
			dispatch(getAUsersBookings()).then(() => {
				setShowModal(false);
			});
		}
	};

	return (
		<div className="edit-booking-modal">
			<h3>Edit reservation</h3>
			<div className="calendar-menu-main-container">
				<div className="booking-card-dates">
					<div>
						Check in: {new Date(bookingStartDate).toDateString()}
					</div>
					<div>
						Check out: {new Date(bookingEndDate).toDateString()}
					</div>
				</div>
				<Calendar
					minDate={new Date()}
					tileDisabled={checkInvalidTile}
					onChange={calendarOnChange}
					selectRange={true}
					value={[
						new Date(bookingStartDate),
						new Date(bookingEndDate),
					]}
				></Calendar>
				{validationErrors.length > 0 &&
					validationErrors.map((error) => (
						<Errors error={error} key={error}></Errors>
					))}
				<button className="delete-btn" onClick={handleSubmit}>
					Confirm
				</button>
			</div>
		</div>
	);
};

export default EditBooking;
