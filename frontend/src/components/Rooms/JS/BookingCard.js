import "../CSS/BookingCard.css";
import { useState } from "react";

const BookingCard = ({ currentRoom, setShowModal }) => {
	//Create start and end dates for default values in input field
	let startDate = new Date();
	let endDate = new Date();
	endDate.setDate(Number(endDate.getDate()) + 5);

	const [bookingStartDate, setBookingStartDate] = useState(startDate);
	const [bookingEndDate, setBookingEndDate] = useState(endDate);
	const [bookingDuration, setBookingDuration] = useState();
	const [guests, setGuests] = useState(1);

	const checkBookingEnd = (e) => {
		let newEndDate = new Date(e.target.value);
		setBookingEndDate(newEndDate);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
	};

	return (
		<div className="room-price-card-container">
			<div className="room-price-card">
				<div className="room-price-card-top-text">
					<div className="room-price">
						<span className="card-price">${currentRoom.price}</span>
						<span>night</span>
					</div>
					<div
						className="room-reviews-and-location in-price-card"
						style={{ paddingBottom: "0rem" }}
					>
						★{Number(currentRoom.avgStarRating).toFixed(2)}
						{" · "}
						{Object.values(currentRoom.reviews).length > 0 && (
							<span
								style={{
									marginLeft: ".25rem",
								}}
								id="reviews-modal-link"
								onClick={() => setShowModal(true)}
							>
								{Number(
									Object.values(currentRoom.reviews).length
								)}{" "}
								review(s)
							</span>
						)}
						{Object.values(currentRoom.reviews).length < 1 && (
							<span
								id="reviews-modal-link-inactive"
								style={{
									marginLeft: ".25rem",
								}}
							>
								{Number(
									Object.values(currentRoom.reviews).length
								)}{" "}
								review(s)
							</span>
						)}
					</div>
				</div>
				<form
					className="booking-info"
					onSubmit={(e) => handleSubmit(e)}
				>
					<div className="choose-dates-container">
						<div className="check-in">
							<label htmlFor="check-in">Check in</label>
							<input
								id="check-in"
								type="date"
								defaultValue={bookingStartDate
									.toISOString()
									.slice(0, 10)}
								min={startDate.toISOString().slice(0, 10)}
							></input>
						</div>
						<div className="check-out">
							<label htmlFor="checkout">Checkout</label>
							<input
								id="checkout"
								type="date"
								defaultValue={bookingEndDate
									.toISOString()
									.slice(0, 10)}
								onChange={(e) => checkBookingEnd(e)}
								min={bookingStartDate
									.toISOString()
									.slice(0, 10)}
							></input>
						</div>
					</div>
					<div className="guests">
						<label htmlFor="guests">guests</label>
						<select defaultValue={guests}>
							<option value="test">2</option>
							<option value="test">1</option>
						</select>
					</div>
					<button className="edit-btn">Check availibility</button>
				</form>
			</div>
		</div>
	);
};

export default BookingCard;
