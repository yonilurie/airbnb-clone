import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

import "../CSS/SingleRoom.css";

function SingleRoom({ room }) {
	const dispatch = useDispatch();
	const history = useHistory();
	const { roomId } = useParams();

	//Redirects user to room they click on
	const showRoomDetails = (e) => {
		let path = `/rooms/${room.id}`;
		history.push(path);
	};

	return (
		<div className="single-room-container">
			<div className="room" onClick={(e) => showRoomDetails(e)}>
				{/* <div className="favorite">♥️</div> */}
				
					<img
						src={room.previewImage}
						alt={`For room ${room.id}`}
					></img>
				

				<div className="room-info" onClick={showRoomDetails}>
					<div className="room-detail name">
						{room.city}, {room.state}
					</div>
					{room.avgStarRating && (
						<div className="room-detail star">
							<span className="star">★</span>
							{Number(room.avgStarRating).toFixed(2)}
						</div>
					)}

					{!room.avgStarRating && (
						<div className="room-detail star">No Reviews</div>
					)}
					{/* <div className="room-detail availability">{"availability"}</div> */}
					<div className="room-detail price">
						<span
							style={{ fontWeight: "600", paddingRight: "2px" }}
						>
							${room.price}{" "}
						</span>
						night
					</div>
				</div>
			</div>
		</div>
	);
}

export default SingleRoom;
