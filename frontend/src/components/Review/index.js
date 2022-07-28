import React, { useState, useEffect } from "react";
import { useParams, useHistory, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { create, getRoomReviews } from "../../store/reviews";

function CreateReview({ setShowModal }) {
	const history = useHistory();
	const dispatch = useDispatch();
	const { roomId } = useParams();
	//State
	const [stars, setStars] = useState("");
	const [review, setReview] = useState("");
	const [validationErrors, setValidationErrors] = useState([]);
	const [isSubmitted, setIsSubmitted] = useState(false);
	const [hasReviewed, setHasReviewed] = useState(false);

	//Get reviews for the room to check if user has already made one
	useEffect(() => {
		dispatch(getRoomReviews(roomId));
	}, [dispatch, roomId]);

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
	}, [stars, review]);

	const sessionuser = useSelector((state) => state.session.user);
	const reviewsArray = Object.values(useSelector((state) => state.reviews));

	if (!sessionuser) return <Redirect to="/" />;

	//Check reviews for one made by the user
	const usersReview = reviewsArray.find(
		(review) => review.userId == sessionuser.id
	);

	console.log(usersReview);

	//On submit if errors are present, setErrors and they will be rendered to user
	const handleSubmit = async (e) => {
		e.preventDefault();

		const reviewData = { review, stars };

		if (!validationErrors.length) {
			await dispatch(create([roomId, JSON.stringify(reviewData)]));

			history.push(`/rooms/${roomId}`);
			history.go(`/rooms/${roomId}`);
		}

		setIsSubmitted(true);
	};
	return (
		<>
			{usersReview === undefined && (
				<form onSubmit={handleSubmit}>
					<h1>Review</h1>
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
			)}
			{usersReview !== undefined && (
				<div>
					<h1>Review already created</h1>
					<div className="review">
						<div>{usersReview.User.firstName}</div>
						<div>{usersReview.createdAt.split("-")[0]}</div>
						<div>{usersReview.review}</div>
					</div>
				</div>
			)}
		</>
	);
}

export default CreateReview;
