import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import roomReducer, { getRooms, getRoomInfo } from "../../store/rooms";
import "./SingleRoom.css";
function SingleRoom({ room }) {
	const dispatch = useDispatch();
	const showRoomDetails = (e) => {
		console.log(room.id);
		
	};
	return (
		<div className="room" onClick={(e) => showRoomDetails(e)}>
			<div className="favorite">♥️</div>
			<img
				src={room.previewImage}
				alt={`image for room ${room.id}`}
			></img>
			<div className="room-info" onClick={showRoomDetails}>
				<div className="room-detail name">{room.name}</div>
				<div className="room-detail star">Star 5.0</div>
				<div className="room-detail availability">{"availability"}</div>
				<div className="room-detail price">
					<b style={{ color: "rgb(34, 34, 34)" }}>${room.price}</b>
					night
				</div>
			</div>
			<Link to={`/${room.id}`}>DETAILS</Link>
		</div>
	);
}

export default SingleRoom;
