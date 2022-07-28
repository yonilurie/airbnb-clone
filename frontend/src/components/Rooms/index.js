import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getRooms } from "../../store/rooms";
import SingleRoom from "./JS/SingleRoom";
import "./CSS/RoomContainer.css";

function Rooms() {
	const dispatch = useDispatch();


	useEffect(() => {
		dispatch(getRooms());
	}, []);

	//Fetch all rooms from DB
	const rooms = Object.values(useSelector((state) => state.rooms));

	return (
		<div>
			<div className="rooms-container">
				{!rooms && <div>LOADING...</div>}
				{rooms &&
					rooms.map((room) => {
					
						return (
							<SingleRoom room={room} key={room.id}></SingleRoom>
						);
					})}
			</div>

		
		</div>
	);
}

export default Rooms;
