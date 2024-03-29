import { useSelector } from "react-redux";

import Reviews from "./Reviews";


import "../CSS/ReviewsModal.css";

const ShowReviewsModal = ({ setShowModal, currentRoom }) => {
	const reviews = Object.values(
		useSelector((state) => state.currentRoom.reviews)
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
					{Number(Object.values(currentRoom.reviews).length)}{" "}
					{Number(Object.values(currentRoom.reviews).length) === 1
						? "review"
						: "reviews"}
				</div>
				<div className="modal-reviews-list-container">
					{reviews.map((review) => {
						return (
							<Reviews
								review={review}
								key={review.id}
								style={{ margin: "0px" }}
							></Reviews>
						);
					})}
				</div>
			</div>
		</div>
	);
};

export default ShowReviewsModal;
