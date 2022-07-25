import React from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";

import "./SingleRoom.css";

function SingleRoom({ room }) {
	const dispatch = useDispatch();
	const history = useHistory();

	const showRoomDetails = (e) => {
		console.log(room.id);
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
				<div className="room-detail name"></div>
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
