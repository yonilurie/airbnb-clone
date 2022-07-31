import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getRooms } from "../../store/rooms";
import SingleRoom from "./JS/SingleRoom";
import "./CSS/RoomContainer.css";

function Rooms() {
	const dispatch = useDispatch();
	const [isDisplayed, setIsDisplayed] = useState(false);
	const rooms = Object.values(useSelector((state) => state.rooms));

	useEffect(() => {
		dispatch(getRooms());
	}, [dispatch]);

	useEffect(() => {
		if (document.title !== 'Airbnb Clone')
		document.title = "Airbnb Clone";
	}, []);
	

	useEffect(() => {
		const timeout = setTimeout(() => {
			setIsDisplayed(true);
		}, 100);

		return () => clearTimeout(timeout);
	}, []);

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
