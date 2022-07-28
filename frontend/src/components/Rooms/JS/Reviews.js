import "../CSS/Review.css";

const Reviews = ({ review }) => {
	const [year, month] = review.createdAt.split("-");
	console.log(review);
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
	);
};

export default Reviews;