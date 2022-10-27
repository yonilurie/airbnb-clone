const BookingActions = ({
	booking,
	hasReview,
	setShowModal,
	setShowReviewModal,
	setShowEditModal,
}) => {
	const isPast = (date) => {
		const endDate = new Date(date).getTime();
		const today = new Date().getTime();
		return endDate < today;
	};

	return (
		<>
			{!isPast(booking.startDate) ? (
				<>
					<div
						className="booking-action-cancel"
						onClick={() => setShowModal(true)}
					>
						Cancel booking
					</div>
					<div
						className="booking-action-edit"
						onClick={() => setShowEditModal(true)}
					>
						Edit booking
					</div>
				</>
			) : (
				<>
					{hasReview ? (
						<div className="booking-action-edit">
							<div
								to={`/review-room/${booking.room.id}`}
								style={{
									width: "100%",
									display: "inline-block",
								}}
								onClick={() => setShowReviewModal(true)}
							>
								Edit review
							</div>
						</div>
					) : (
						<div className="booking-action-edit">
							<div
								to={`/review-room/${booking.room.id}`}
								style={{
									width: "100%",
									display: "inline-block",
								}}
								onClick={() => setShowReviewModal(true)}
							>
								Create review
							</div>
						</div>
					)}
				</>
			)}
		</>
	);
};

export default BookingActions;
