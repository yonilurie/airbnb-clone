import "../CSS/BookingCard.css";

const BookingCard = ({ currentRoom, setShowModal }) => {
	let startDate = new Date().toISOString().slice(0, 10);
	let endDate = new Date();
	endDate.setDate(Number(endDate.getDate()) + 5);
	endDate = endDate.toISOString().slice(0, 10);
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
				<div className="booking-info">
					<div className="choose-dates-container">
						<div className="check-in">
							<label>Check in</label>
							<input type="date" defaultValue={startDate}></input>
						</div>
						<div className="check-out">
							<label>Checkout</label>
							<input type="date" defaultValue={endDate}></input>
						</div>
					</div>
					<div className="guests">guests</div>
				</div>
			</div>
		</div>
	);
};

export default BookingCard;
