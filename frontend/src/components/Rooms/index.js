import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getRooms } from "../../store/rooms";
import { getRoomInfo } from "../../store/CurrentRoom";
import SingleRoom from "./JS/SingleRoom";
import "./CSS/RoomContainer.css";

function Rooms() {
	const dispatch = useDispatch();

	const rooms = Object.values(useSelector((state) => state.rooms));

	useEffect(() => {
		dispatch(getRooms());
	}, [rooms]);

	//Fetch all rooms from DB


	return (
		<div className="rooms-container">
			{!rooms && <div>LOADING...</div>}
			{rooms &&
				rooms.map((room) => {
					return <SingleRoom room={room} key={room.id}></SingleRoom>;
				})}
		</div>
	);
}

export default Rooms;
