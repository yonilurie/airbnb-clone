import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { deleteARoom } from "../../../store/session";

import "../CSS/MyRoom.css";

function MyRoom({ room }) {
	const dispatch = useDispatch();
	const history = useHistory();

	//Redirects user to room they click on
	const showRoomDetails = (e) => {
		let path = `/rooms/${room.id}`;
		history.push(path);
	};

	return (
		<div className="my-room">
			<div className="my-room-left" onClick={(e) => showRoomDetails(e)}>
				<img
					src={room.previewImage}
					alt={`For room ${room.id}`}
					className="preview-image-my-room"
				></img>
			</div>
			<div className="my-room-right" >
				<div className="room-detail name">{room.name}</div>
				<div className="room-detail name">
					{room.city}, {room.state} {room.country}
				</div>
				<div className="room-detail price"> ${room.price} Night</div>
				<div className="room-detail-actions">
					<button
						className="my-room-btn"
						onClick={() => dispatch(deleteARoom(room.id))}
					>
						Delete
					</button>
					<button className="my-room-btn" onClick={() => {
						history.push(`/rooms/${room.id}/edit`)
					}}>Edit</button>
				</div>
			</div>
		</div>
	);
}

export default MyRoom;
