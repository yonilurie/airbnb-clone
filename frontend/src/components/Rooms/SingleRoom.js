import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import "./SingleRoom.css";

function SingleRoom({ room }) {
	const dispatch = useDispatch();
	const history = useHistory();

	//Redirects user to room they click on
	const showRoomDetails = (e) => {
		let path = `/rooms/${room.id}`;
		history.push(path);
	};

	return (
		<div className="room" onClick={(e) => showRoomDetails(e)}>
			<div className="favorite">♥️</div>
			<img
				src={room.previewImage}
				alt={`image for room ${room.id}`}
			></img>
			<div className="room-info" onClick={showRoomDetails}>
				<div className="room-detail name">
					{room.city}, {room.state}
				</div>
				<div className="room-detail star">Star 5.0</div>
				<div className="room-detail availability">{"availability"}</div>
				<div className="room-detail price">
					<b style={{ color: "rgb(34, 34, 34)" }}>${room.price}</b>
					night
				</div>
			</div>
		
		</div>
	);
}

export default SingleRoom;
