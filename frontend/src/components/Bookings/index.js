import { useEffect } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { getAUsersBookings } from "../../store/session";

import Booking from "./JS/Booking";
import "./CSS/Bookings.css";

const Bookings = () => {
	const dispatch = useDispatch();
	const history = useHistory();

	const bookings = useSelector((state) => state.session.bookings);
	const sessionuser = useSelector((state) => state.session.user);

	useEffect(() => {
		dispatch(getAUsersBookings());
	}, [dispatch]);

	useEffect(() => {
		if (document.title !== "My Trips") document.title = "My Trips";
	}, []);

	if (!sessionuser) return <Redirect to="/" />;

	const home = () => history.push("/");

	return (
		<div className="bookings-page-container">
			<h1>Trips</h1>
			{!bookings.futureBookings && (
				<div className="empty-bookings-placeholder">
					<div className="current-bookings-empty-text">
						<h3>No trips booked...yet!</h3>
						<div>
							Time to dust off your bags and start planning your
							next adventure
						</div>
						<button onClick={home} className="search-btn">
							Start searching
						</button>
					</div>
					<div className="empty-bookings-img-container">
						<img
							src="https://a0.muscache.com/im/pictures/d727f355-3f10-44b5-9750-d1efca2438fc.jpg?im_w=720"
							className="empty-bookings-img"
							alt="no future bookings"
						></img>
					</div>
				</div>
			)}
			{bookings.futureBookings && (
				<div>
					{bookings.currentBookings &&
						Object.values(bookings.currentBookings).length > 0 && (
							<>
								<h2>Current</h2>
								<div className="past-bookings">
									{Object.values(bookings.pastBookings)
										.length > 0 &&
										Object.values(
											bookings.pastBookings
										).map((booking) => (
											<Booking
												booking={booking}
												key={booking.id}
												reviewDisabled={true}
											/>
										))}
								</div>
							</>
						)}
					{bookings.futureBookings &&
						Object.values(bookings.futureBookings).length > 0 && (
							<div>
								<h2>Where you're headed</h2>
								<div className="past-bookings">
									{Object.values(bookings.futureBookings)
										.length > 0 &&
										Object.values(
											bookings.futureBookings
										).map((booking) => (
											<Booking
												booking={booking}
												key={booking.id}
												reviewDisabled={true}
											/>
										))}
								</div>
							</div>
						)}
					{bookings.pastBookings &&
						Object.values(bookings.pastBookings).length > 0 && (
							<div className="past-bookings-container">
								<h2 style={{ marginTop: "2rem" }}>
									Where you've been
								</h2>
								<div className="past-bookings">
									{Object.values(bookings.pastBookings)
										.length > 0 &&
										Object.values(
											bookings.pastBookings
										).map((booking) => (
											<Booking
												booking={booking}
												key={booking.id}
												reviewDisabled={false}
											/>
										))}

									{/* {bookings[0] === "No bookings yet" && (
										<div>No bookings yet</div>
									)} */}
								</div>
							</div>
						)}
				</div>
			)}
		</div>
	);
};

export default Bookings;
