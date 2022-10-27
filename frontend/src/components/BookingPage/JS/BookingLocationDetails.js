import { Link, useHistory } from "react-router-dom";

const BookingLocationDetails = ({ room, booking }) => {
	const history = useHistory();

	const getDate = (date) => {
		let newDate = new Date(date);
		return newDate.toDateString();
	};

	return (
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
					<Link to={`/rooms/${room.id}`} className="direction-card">
						Show listing
					</Link>
				</div>
			</div>
		</div>
	);
};

export default BookingLocationDetails;
