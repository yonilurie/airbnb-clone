import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Reviews from "./Reviews";
import "../CSS/ReviewsModal.css";
const ShowReviewsModal = ({ showModal, setShowModal, currentRoom }) => {
    
	const reviews = Object.values(
		useSelector((state) => state.currentRoom.Reviews)
	);
	return (
		<div className="modal-body reviews-container">
			<button
				className="modal-exit-btn"
				onClick={() => setShowModal(false)}
			>
				X
			</button>
			<div className="reviews-modal-container">
				<div className="ratings-container">
					★{Number(currentRoom.avgStarRating).toFixed(2)}
					{" · "}
					{Number(Object.values(currentRoom.Reviews).length)}{" "}
					review(s)
				</div>
				<div className="modal-reviews-list-container">
					{reviews.map((review) => {
						return (
							<Reviews review={review} key={review.id}></Reviews>
						);
					})}
				</div>
			</div>
		</div>
	);
};

export default ShowReviewsModal;
