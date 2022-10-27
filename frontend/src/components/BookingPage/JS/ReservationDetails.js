const ReservationDetails = ({ booking, user }) => {
	return (
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
	);
};

export default ReservationDetails;
