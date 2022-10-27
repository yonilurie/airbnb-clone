import Calendar from "react-calendar";

import "react-calendar/dist/Calendar.css";
import "../CSS/BookingCard.css";
const CalendarMenu = ({
	minDate,
	tileDisabled,
	onChange,
	bookingEndDate,
	bookingStartDate,
	setDate,
}) => {
	return (
		<div className="calendar-menu-main-container">
			<div className="booking-card-dates">
				{setDate && (
					<>
						<div>
							Check in:{" "}
							{bookingStartDate.toLocaleString().split(",")[0]}{" "}
						</div>

						<div>
							Check out:{" "}
							{bookingEndDate.toLocaleString().split(",")[0]}
						</div>
					</>
				)}
			</div>
			<Calendar
				minDate={minDate}
				value={setDate ? [bookingStartDate, bookingEndDate] : null}
				tileDisabled={tileDisabled}
				onChange={onChange}
				selectRange={true}
			></Calendar>
		</div>
	);
};

export default CalendarMenu;
