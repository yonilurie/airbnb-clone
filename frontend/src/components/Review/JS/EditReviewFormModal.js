import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { getRoomInfo } from "../../../store/CurrentRoom";
import { editAUsersReview } from "../../../store/session";
import Errors from "../../Errors";

const EditReviewFormModal = ({ setShowModal, review }) => {
	const dispatch = useDispatch();
	const history = useHistory();

	const { roomId } = useParams();

	const [stars, setStars] = useState(review.stars);
	const [reviewMessage, setReviewMessage] = useState(review.review);
	const [validationErrors, setValidationErrors] = useState([]);
	const [isSubmitted, setIsSubmitted] = useState(false);

	useEffect(() => {
		const errors = [];
		if (stars < 1 || stars > 5) {
			errors.push("Star rating must be between 1 and 5");
		}
		if (reviewMessage.length < 10 || reviewMessage.length > 500) {
			errors.push("Review must be between 10 and 500 characters");
		}
		setValidationErrors(errors);
	}, [stars, reviewMessage]);

	//On submit if errors are present, setErrors and they will be rendered to user
	const handleSubmit = async (e) => {
		e.preventDefault();
		const newReview = {
			stars,
			review: reviewMessage,
		};

		if (validationErrors.length === 0) {
			dispatch(editAUsersReview([review.id, newReview]));
			dispatch(getRoomInfo(roomId));
			setShowModal(false);
			history.push(`/rooms/${roomId}`);
			return;
		}
		setIsSubmitted(true);
	};

	return (
		<div className="modal-body review">
			<button
				className="modal-exit-btn"
				onClick={() => setShowModal(false)}
			>
				X
			</button>
			<div className="modal-header">
				<div className="modal-title">Edit review</div>
			</div>
			<form onSubmit={handleSubmit}>
				<h3 className="modal-welcome">Welcome to Airbnb</h3>
				{isSubmitted && validationErrors.length > 0 && (
					<ul className="errors">
						{validationErrors.map((error, idx) => (
							<Errors error={error}></Errors>
						))}
					</ul>
				)}
				<div>
					<div className="modal-input-label" hidden={!stars}>
						Stars
					</div>
					<input
						className="modal-input"
						type="number"
						min="0"
						max="5"
						placeholder="Star rating from 1-5"
						value={stars}
						onChange={(e) => setStars(e.target.value)}
						required
					/>
				</div>
				<div className="input-container review-textarea">
					{" "}
					<div className="modal-input-label" hidden={!stars}></div>
					<textarea
						className="modal-input"
						placeholder="Review"
						value={reviewMessage}
						onChange={(e) => setReviewMessage(e.target.value)}
						required
					/>
				</div>
				<button type="submit" className="login-register-submit">
					Submit Review
				</button>
			</form>
		</div>
	);
};

export default EditReviewFormModal;
