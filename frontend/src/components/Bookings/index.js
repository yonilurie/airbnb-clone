import { useEffect } from "react";
import { Redirect, useHistory, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getAUsersBookings } from "../../store/myBookings";

import Booking from "./Booking";
import "./Bookings.css";

const Bookings = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	useEffect(() => {
		dispatch(getAUsersBookings());
	}, [dispatch]);

	const bookings = Object.values(useSelector((state) => state.myBookings));

	const sessionuser = useSelector((state) => state.session.user);
	if (!sessionuser) return <Redirect to="/" />;

	const home = () => {
		history.push("/");
	};

	return (
		<>
			<div className="current-bookings-empty">
				<h1>Trips</h1>
				<h3>No trips booked...yet!</h3>
				<div>
					Time to dust off your bags and start planning your next
					adventure
				</div>
				<button onClick={home} className="search-btn">
					Start searching
				</button>
			</div>

			<div className="past-bookings-container">
				<h2>Where you've been</h2>
				<div className="past-bookings">
					{bookings &&
						bookings[0] !== "No bookings yet" &&
						bookings.map((booking) => {
							return (
								<Booking booking={booking} key={booking.id} />
							);
						})}

					{bookings[0] === "No bookings yet" && (
						<div>No bookings yet</div>
					)}
				</div>
			</div>
		</>
	);
};

export default Bookings;
