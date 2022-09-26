import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {getAUsersBookings, getAUsersReviews, getMyRoomsData} from '../../store/session'
import { getRooms } from "../../store/rooms";
import SingleRoom from "./JS/SingleRoom";
import "./CSS/RoomContainer.css";

function Rooms() {
	const dispatch = useDispatch();
	const [isDisplayed, setIsDisplayed] = useState(false);
	const rooms = Object.values(useSelector((state) => state.rooms));

	useEffect(() => {
		dispatch(getRooms());
		// dispatch(getAUsersBookings())
		// dispatch(getAUsersReviews())
		// dispatch(getMyRoomsData())
	}, [dispatch]);

	useEffect(() => {
		if (document.title !== "Airbnb Clone") document.title = "Airbnb Clone";
	}, []);

	useEffect(() => {
		if (!rooms.length) {
			const timeout = setTimeout(() => {
				setIsDisplayed(true);
			}, 250);

			return () => clearTimeout(timeout);
		} else {
			setIsDisplayed(true);
		}
	}, []);

	// useEffect(() => {
	// 	const timeout = setTimeout(() => {
	// 			setLoaded(true);
	// 	}, 250);
	// 	return clearTimeout(timeout)
	// })

	return (
		<div className="rooms-container">
			{rooms &&
				isDisplayed &&
				rooms.map((room) => {
					return <SingleRoom room={room} key={room.id}></SingleRoom>;
				})}
		</div>
	);
}

export default Rooms;
