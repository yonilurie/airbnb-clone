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
	console.log(bookings);

	const sessionuser = useSelector((state) => state.session.user);
	if (!sessionuser) return <Redirect to="/" />;

	const home = () => {
	
		history.push("/");
	};

	return (
		<>
			<h1>Trips</h1>
			<h3>No trips booked...yet!</h3>
			<div>
				Time to dust off your bags and start planning your next
				adventure
			</div>
			<button onClick={home} className="search-btn">
				Start Searching
			</button>

			<div className="past-bookings-container">
				<h2>Where you've been</h2>
				<div className="past-bookings">
					{bookings &&
						bookings[0] !== "No bookings yet" &&
						bookings.map((booking) => {
							return (
								<NavLink
									to={`/rooms/${booking.Room.id}`}
									key={booking.id}
								>
									<Booking booking={booking} />
								</NavLink>
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
