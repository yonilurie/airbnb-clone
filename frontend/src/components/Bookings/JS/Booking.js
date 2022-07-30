import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAUsersReviews } from "../../../store/myReviews";

const Booking = ({ booking, reviewDisabled }) => {

	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getAUsersReviews());
	}, [dispatch]);
	const myReviews = Object.values(useSelector((state) => state.myReviews));
	
	let hasReview = myReviews.find(review => Number(review.roomId) === Number(booking.roomId))

	let buttonMsg;
	if (hasReview) {
		buttonMsg = 'Edit review'
	} else {
		buttonMsg = 'Add review'
	}


	const [startYear, startMonth, startDay] = booking.startDate.split("-");
	const [endYear, endMonth, endDay] = booking.endDate.split("-");
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
	let bookingDuration = ["month", "duration", "year"];

	//Account for trip overlapping months
	if (startMonth === endMonth) {
		bookingDuration[0] = months[startMonth - 1].slice(0, 3);
	} else {
		const start = months[startMonth - 1].slice(0, 3);
		const end = months[endMonth - 1].slice(0, 3);
		bookingDuration[0] = `${start}-${end} `;
	}
	//Account for trip overlapping years
	if (startYear === endYear) {
		bookingDuration[2] = startYear;
	} else {
		bookingDuration[2] = `${startYear}-${endYear}`;
	}
	//Set the days of the booking
	const durationStartDay = Number(startDay.slice(0, 2));
	const durationEndDay = Number(endDay.slice(0, 2));
	bookingDuration[1] = `${durationStartDay}-${durationEndDay},`;

	return (
		<div className="single-booking-container">
			<NavLink to={`/rooms/${booking.Room.id}`} className="booking">
				<div className="booking-image">
					<img
						src={booking.Room.previewImage}
						alt="preview"
						className="preview-image"
					></img>
				</div>
				<div className="booking-info">
					<div className="city">{booking.Room.city}</div>
					<div className="owner">
						Hosted by user {booking.Room.ownerId}
					</div>
					<div className="duration">{bookingDuration.join(" ")}</div>
				</div>
			</NavLink>
			{!reviewDisabled && (
				<NavLink to={`/add-review/${booking.Room.id}`}>
					<button className="review-btn">{buttonMsg}</button>
				</NavLink>
			)}
		</div>
	);
};

export default Booking;
