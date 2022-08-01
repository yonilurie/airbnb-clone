import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createRoomReview, getRoomInfo } from "../../../store/CurrentRoom";

function ReviewForm({ setShowModal }) {
	const history = useHistory();
	const dispatch = useDispatch();
	const { roomId } = useParams();
	//State
	const [stars, setStars] = useState("");
	const [review, setReview] = useState("");
	const [validationErrors, setValidationErrors] = useState([]);
	const [isSubmitted, setIsSubmitted] = useState(false);

	useEffect(() => {
		const errors = [];
		if (stars < 1 || stars > 5) {
			errors.push("Stars must be between 1 and 5");
		}

		if (review.length < 10 || review.length > 500) {
			errors.push("Review must be between 10 and 500 characters");
		}

		setValidationErrors(errors);
	}, [stars, review]);

	//On submit if errors are present, setErrors and they will be rendered to user
	const handleSubmit = async (e) => {
		e.preventDefault();

		const reviewData = { review, stars };

		if (!validationErrors.length) {
			dispatch(createRoomReview([roomId, JSON.stringify(reviewData)]));
			dispatch(getRoomInfo(roomId))
			
			history.push(`/rooms/${roomId}`);
		}

		setIsSubmitted(true);
	};

	return (
		<div className="modal-body">
			<button
				className="modal-exit-btn"
				onClick={() => setShowModal(false)}
			>
				X
			</button>
			<div className="modal-header">
				<div className="modal-title">Leave a Review</div>
			</div>

			<form onSubmit={handleSubmit}>
				<h3 className="modal-welcome">Review</h3>
				{isSubmitted && validationErrors.length > 0 && (
					<ul className="errors">
						{validationErrors.map((error, idx) => (
							<li key={idx}>{error}</li>
						))}
					</ul>
				)}

				<input
					className="modal-input"
					type="number"
					placeholder="Stars"
					value={stars}
					onChange={(e) => setStars(e.target.value)}
					required
				/>
				<textarea
					className="modal-input"
					value={review}
					onChange={(e) => setReview(e.target.value)}
					required
				></textarea>

				<button type="submit" className="login-register-submit">
					Submit Review
				</button>
			</form>
		</div>
	);
}

export default ReviewForm;
