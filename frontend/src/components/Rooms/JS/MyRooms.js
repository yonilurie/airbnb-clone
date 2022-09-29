import { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getMyRoomsData } from "../../../store/session";

import SingleRoom from "./SingleRoom";

import "../CSS/RoomContainer.css";

const MyRooms = () => {
	const dispatch = useDispatch();
	const [isDisplayed, setIsDisplayed] = useState(false);
	const sessionuser = useSelector((state) => state.session.user);

	const rooms = Object.values(useSelector((state) => state.session.rooms));

	useEffect(() => {
		dispatch(getMyRoomsData());
	}, [dispatch]);

	useEffect(() => {
		const timeout = setTimeout(() => {
			setIsDisplayed(true);
		}, 300);

		return () => clearTimeout(timeout);
	}, []);

	useEffect(() => {
		if (document.title !== "My Rooms") document.title = "My Rooms";
	}, []);

	//If the user is not logged in, redirect the user to home page

	if (!sessionuser) return <Redirect to="/" />;

	return (
		<div className="rooms-main-container">
			<h1>Your rooms</h1>
			{isDisplayed && rooms && rooms.length > 0 && (
				<div className="rooms-container">
					{rooms.map((room) => {
						return (
							<SingleRoom room={room} key={room.id}></SingleRoom>
						);
					})}
				</div>
			)}
		</div>
	);
};

export default MyRooms;
