import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import roomReducer, { getRooms } from "../../store/rooms";
import "./SingleRoom.css";
function SingleRoom({ room }) {
	const showRoomDetails = (e) => {
		console.log(room.id);
	};
	return (
		<div className="room" onClick={(e) => showRoomDetails(e)} >
			<img
				src={room.previewImage}
				alt={`image for room ${room.id}`}
			></img>
			<div>{room.name}</div>
			<div>{room.price}</div>
			<div>{room.name}</div>
		</div>
	);
}

export default SingleRoom;
