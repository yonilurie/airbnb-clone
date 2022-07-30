import "../CSS/Review.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getRoomReviews } from "../../../store/reviews";
const Reviews = ({ review }) => {
	
	const dispatch = useDispatch();
	const { roomId } = useParams();

	useEffect(() => {
		dispatch(getRoomReviews(Number(roomId)));
	}, [dispatch, roomId]);

	const [year, month] = review.createdAt.split("-");

	const months = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];
	const reviewMonth = months[Number(month) - 1];

	return (
		<>
			{review && (
				<div className="review">
					<div key={review.id} className="review-content">
						<div className="user-info">
							<h3 className="review-user-name">
								{review.User.firstName}
							</h3>
							<div className="Date">
								{reviewMonth} {year}
							</div>
						</div>
						<div className="review-content">{review.review}</div>
					</div>
				</div>
			)}
		</>
	);
};

export default Reviews;
