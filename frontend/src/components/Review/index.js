import React, { useState, useEffect } from "react";
import { useParams, useHistory, Redirect, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createRoomReview } from "../../store/CurrentRoom";
import { getRoomInfo } from "../../store/CurrentRoom";
import { deleteAReview, getAUsersBookings } from "../../store/session";
import { getAUsersReviews } from "../../store/session";
import Reviews from "../Rooms/JS/Reviews";
import EditReviewModal from "./JS/EditReviewModal";
import "./CSS/Review.css";

function CreateReview() {
	const history = useHistory();
	const dispatch = useDispatch();
	const { roomId } = useParams();
	//State
	const [stars, setStars] = useState("");
	const [review, setReview] = useState("");
	const [validationErrors, setValidationErrors] = useState([]);
	const [isSubmitted, setIsSubmitted] = useState(false);
	const [showModal, setShowModal] = useState(false);

	//Get reviews for the room to check if user has already made one
	useEffect(() => {
		dispatch(getAUsersBookings());
	}, [dispatch]);

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

	const myReviews = Object.values(
		useSelector((state) => state.session.reviews)
	);

	const sessionuser = useSelector((state) => state.session.user);
	if (!sessionuser) return <Redirect to="/" />;

	//Check reviews for one made by the user
	let usersReview = myReviews.find(
		(review) => Number(roomId) === Number(review.roomId)
	);

	//On submit if errors are present, setErrors and they will be rendered to user
	const handleSubmit = async (e) => {
		e.preventDefault();
		const reviewData = { review, stars };

		if (!validationErrors.length) {
			dispatch(createRoomReview([roomId, reviewData]));
			history.push(`/rooms/${roomId}`);
		}
		setIsSubmitted(true);
	};

	const deleteReview = (e) => {
		e.preventDefault();
		dispatch(deleteAReview(usersReview.id));
		history.push(`/trips`);
	};

	return (
		<div className="review-container-main">
			{usersReview === undefined && (
				<form onSubmit={handleSubmit}>
					<h1>Review</h1>
					{isSubmitted && validationErrors.length > 0 && (
						<ul className="errors">
							{validationErrors.map((error, idx) => (
								<li key={idx} className='error'>{error}</li>
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
			{usersReview !== undefined && (
				<div>
					<EditReviewModal
						review={usersReview}
						showModal={showModal}
						setShowModal={setShowModal}
					></EditReviewModal>
					<h1>Review already created</h1>
					<Reviews review={usersReview}></Reviews>
					<div className="button-container">
						<button
							onClick={() => setShowModal(true)}
							className="edit-btn"
						>
							Edit Review
						</button>
						<button onClick={deleteReview} className="delete-btn">
							Delete Review
						</button>
					</div>
				</div>
			)}
			<NavLink to={`/rooms/${roomId}`}>Visit Room</NavLink>
		</div>
	);
}

export default CreateReview;
