import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { getRoomReviews } from "../../../store/reviews";

import { getMyRoomsData } from "../../../store/myRooms";
import "../CSS/SingleRoom.css";

function SingleRoom({ room }) {
	const dispatch = useDispatch();
	const history = useHistory();
	const { roomId } = useParams();

	useEffect(() => {
		dispatch(getMyRoomsData());
		if (roomId) {
			dispatch(getRoomReviews(roomId));
		}
	}, [dispatch]);

	//Redirects user to room they click on
	const showRoomDetails = (e) => {
		let path = `/rooms/${room.id}`;
		history.push(path);
	};

	return (
		<div className="room" onClick={(e) => showRoomDetails(e)}>
			{/* <div className="favorite">♥️</div> */}
			<img
				src={room.previewImage}
				alt={`image for room ${room.id}`}
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
					<b style={{ color: "rgb(34, 34, 34)" }}>${room.price}</b>
					night
				</div>
			</div>
		</div>
	);
}

export default SingleRoom;
