import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { editAReview } from "../../../store/reviews";
import { getRoomReviews } from "../../../store/reviews";
const EditReviewFormModal = ({ showModal, setShowModal, review }) => {
	const dispatch = useDispatch();
    const history = useHistory();
    const {roomId} = useParams()
	//State
	const [stars, setStars] = useState(review.stars);
	const [reviewMessage, setReviewMessage] = useState(review.review);
	const [errors, setErrors] = useState([]);

	//On submit if errors are present, setErrors and they will be rendered to user
	const handleSubmit = async (e) => {
		e.preventDefault();

		const newReview = {
			stars,
			review: reviewMessage,
		};

		dispatch(editAReview([newReview, review.id, review.roomId]));
		history.push(`/rooms/${roomId}`);

		setShowModal(false);
		return;
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
				<div className="modal-title">Edit review</div>
			</div>

			<form onSubmit={handleSubmit}>
				<h3 className="modal-welcome">Welcome to Airbnb</h3>
				{errors.length > 0 && (
					<ul className="errors">
						{errors.map((error, idx) => (
							<li key={idx}>{error}</li>
						))}
					</ul>
				)}
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
				<textarea
					className="modal-input"
					value={reviewMessage}
					onChange={(e) => setReviewMessage(e.target.value)}
					required
				/>
				<button type="submit" className="login-register-submit">
					Submit Review
				</button>
			</form>
		</div>
	);
};

export default EditReviewFormModal;
