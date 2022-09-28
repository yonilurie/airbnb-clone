import Calendar, { YearView } from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useState } from "react";
import "../CSS/BookingCard.css";
const CalendarMenu = ({
	minDate,
	tileDisabled,
	onChange,
	bookingEndDate,
	bookingStartDate,
	room,
}) => {
	return (
		<div className="calendar-menu-main-container">
			<div className="booking-card-dates">
				<div>
					Check in: {bookingStartDate.toLocaleString().split(",")[0]}{" "}
				</div>

				<div>
					Check out: {bookingEndDate.toLocaleString().split(",")[0]}
				</div>
			</div>
			<Calendar
				minDate={minDate}
				value={[bookingStartDate, bookingEndDate]}
				tileDisabled={tileDisabled}
				onChange={onChange}
				selectRange={true}
			></Calendar>
		</div>
	);
};

export default CalendarMenu;
