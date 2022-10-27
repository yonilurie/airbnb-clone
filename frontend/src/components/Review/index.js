import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createRoomReview } from "../../store/CurrentRoom";
import {
	editAUsersReview,
	getAUsersReviews,
	deleteAReview,
} from "../../store/session";

import Errors from "../Errors";

import "./CSS/Review.css";

function CreateReview({ userReview, roomId, setShowReviewModal }) {
	const dispatch = useDispatch();

	const [stars, setStars] = useState("");
	const [review, setReview] = useState("");
	const [validationErrors, setValidationErrors] = useState([]);
	const [isSubmitted, setIsSubmitted] = useState(false);
	const [showModal, setShowModal] = useState(false);

	//Form validation
	useEffect(() => {
		const errors = [];
		if (stars < 1 || stars > 5) {
			errors.push("Stars must be between 1 and 5");
		}
		if (review.length < 10 || review.length > 500) {
			errors.push("Review must be between 10 and 500 characters");
		}

		setValidationErrors(errors);
	}, [stars, review, dispatch]);

	useEffect(() => {
		if (userReview) {
			setStars(userReview.stars);
			setReview(userReview.review);
		}
	}, [userReview]);

	//On submit if errors are present, setErrors and they will be rendered to user
	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!validationErrors.length) {
			// If editing
			if (userReview) {
				const newReview = { stars, review };
				dispatch(
					editAUsersReview([userReview.id, newReview])
				).then(() => dispatch(getAUsersReviews()));
				// If creating new review
			} else {
				const reviewData = { review, stars };
				dispatch(createRoomReview([roomId, reviewData])).then(() =>
					dispatch(getAUsersReviews())
				);
			}
			setShowReviewModal(false);
		}
		setIsSubmitted(true);
	};

	const deleteReview = (e) => {
		e.preventDefault();
		dispatch(deleteAReview(userReview.id)).then(() => {
			dispatch(getAUsersReviews());
		});
		setShowReviewModal(false);
	};

	return (
		<div className="review-container-main">
			<>
				{userReview ? (
					<form onSubmit={handleSubmit}>
						<h1>Review already created</h1>
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
							placeholder="Review - Minimum 10 Characters"
							value={review}
							onChange={(e) => setReview(e.target.value)}
							required
						></textarea>
						<div className="button-container">
							<button
								onClick={() => setShowModal(true)}
								className="edit-btn"
							>
								Edit Review
							</button>
							<button
								onClick={deleteReview}
								className="delete-btn"
							>
								Delete Review
							</button>
						</div>
					</form>
				) : (
					<form onSubmit={handleSubmit}>
						<h1>Review</h1>
						{isSubmitted && validationErrors.length > 0 && (
							<ul className="errors">
								{validationErrors.map((error, idx) => (
									<Errors error={error}></Errors>
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
							placeholder="Review - Minimum 10 Characters"
							value={review}
							onChange={(e) => setReview(e.target.value)}
							required
						></textarea>
						<button type="submit" className="login-register-submit">
							Submit Review
						</button>
					</form>
				)}
				<div className="visit-room-link">
					<Link to={`/rooms/${userReview.roomId}`}>Visit Room</Link>
				</div>
			</>
		</div>
	);
}

export default CreateReview;
