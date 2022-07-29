import { useEffect, useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getAUsersBookings } from "../../store/myBookings";

import Booking from "./JS/Booking";
import "./CSS/Bookings.css";

const Bookings = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const [isDisplayed, setIsDisplayed] = useState(true);

	useEffect(() => {
		dispatch(getAUsersBookings());
	}, [dispatch]);

	// useEffect(() => {
	// 	const timeout = setTimeout(() => {
	// 		setIsDisplayed(true);
	// 	}, 300);

	// 	return () => clearTimeout(timeout);
	// }, [dispatch]);

	const bookings = Object.values(useSelector((state) => state.myBookings));

	const sessionuser = useSelector((state) => state.session.user);
	if (!sessionuser) return <Redirect to="/" />;

	let pastBookings = [];
	let futureBookings = [];

	if (bookings.length && bookings[0] !== "No bookings yet") {
		bookings.forEach((booking) => {
			let now = new Date();
			let time = new Date(booking.startDate);
			if (time.getTime() < now) {
				pastBookings.push(booking);
			}
			if (time.getTime() > now) {
				futureBookings.push(booking);
			}
		});
	}

	const home = () => {
		history.push("/");
	};

	return (
		<>
			<h1>Trips</h1>
			{isDisplayed && bookings.length > 1 && (
				<div>
					{futureBookings.length < 1 && (
						<div className="empty-bookings-placeholder">
							<div className="current-bookings-empty-text">
								<h3>No trips booked...yet!</h3>
								<div>
									Time to dust off your bags and start
									planning your next adventure
								</div>
								<button onClick={home} className="search-btn">
									Start searching
								</button>
							</div>
							<div>
								<img
									src="https://a0.muscache.com/im/pictures/d727f355-3f10-44b5-9750-d1efca2438fc.jpg?im_w=720"
									className="empty-bookings-img"
									alt="no future bookings"
								></img>
							</div>
						</div>
					)}

					{futureBookings.length >= 1 && (
						<div>
							<h3>Where you're headed</h3>
							<Booking
								booking={futureBookings[0]}
								reviewDisabled={true}
							></Booking>
						</div>
					)}

					<div className="past-bookings-container">
						<h2>Where you've been</h2>
						<div className="past-bookings">
							{bookings &&
								bookings[0] !== "No bookings yet" &&
								pastBookings.map((booking) => {
									return (
										<Booking
											booking={booking}
											key={booking.id}
											reviewDisabled={false}
										/>
									);
								})}

							{bookings[0] === "No bookings yet" && (
								<div>No bookings yet</div>
							)}
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default Bookings;
