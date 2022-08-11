import "../CSS/BookingCard.css";
import { useState, useEffect } from "react";

const BookingCard = ({ currentRoom, setShowModal }) => {
	//Create start and end dates for default values in input field
	let startDate = new Date();
	let endDate = new Date();
	endDate.setDate(Number(endDate.getDate()) + 5);

	const cleaningFeeCost = 22;
	const serviceFeeCost = 35;

	const [bookingStartDate, setBookingStartDate] = useState(startDate);
	const [bookingEndDate, setBookingEndDate] = useState(endDate);
	const [bookingDuration, setBookingDuration] = useState(5);
	const [guests, setGuests] = useState(1);
	const [nightlyTotal, setNightlyTotal] = useState(currentRoom.price * 5);
	const [cleaningFee, setCleaningFee] = useState(5 * cleaningFeeCost);
	const [serviceFee, setServiceFee] = useState(5 * serviceFeeCost);
	const [bookingTotal, setBookingTotal] = useState(
		nightlyTotal + cleaningFee + serviceFee
	);

	const handleSubmit = (e) => {
		e.preventDefault();
	};

	const onStartDateChange = (e) => {
		let newStartDate = new Date(e.target.value);
		setBookingStartDate(newStartDate);
	};

	const checkBookingEnd = (e) => {
		let newEndDate = new Date(e.target.value);
		setBookingEndDate(newEndDate);
	};

	useEffect(() => {
		let difference = bookingEndDate.getTime() - bookingStartDate.getTime();
		let duration = Math.ceil(difference / (1000 * 3600 * 24));
		setBookingDuration(duration - 1);
	}, [bookingStartDate, bookingEndDate]);

	useEffect(() => {
		setCleaningFee(bookingDuration * cleaningFeeCost);
		setServiceFee(bookingDuration * serviceFeeCost);
		setNightlyTotal(bookingDuration * currentRoom.price);
	}, [bookingDuration]);

	useEffect(() => {
		setBookingTotal(nightlyTotal + cleaningFee + serviceFee);
	}, [nightlyTotal]);

	return (
		<div className="room-price-card-container">
			<div>TEST {bookingDuration}</div>
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
								onChange={(e) => onStartDateChange(e)}
								min={startDate.toISOString().slice(0, 10)}
								max={bookingEndDate.toISOString().slice(0, 10)}
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
				<div className="pricing-info">
					<div className="price-items">
						<div className="nightly-total">
							<div className="row-detail">
								${currentRoom.price} x {bookingDuration} nights
							</div>
							<div className="row-total">{nightlyTotal}</div>
						</div>

						<div className="cleaning-total">
							<div className="row-detail">Cleaning fee</div>
							<div className="row-total">{cleaningFee}</div>
						</div>

						<div className="nightly-total">
							<div className="row-detail">Service fee</div>
							<div className="row-total">{serviceFee}</div>
						</div>
					</div>
					<div className="price-total">
						<div className="booking-total-detail">
							Total before taxes
						</div>
						<div className="booking-total-price">
							{bookingTotal}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default BookingCard;
