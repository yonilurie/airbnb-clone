import { useHistory } from "react-router-dom";

import "../CSS/SingleRoom.css";

function SingleRoom({ room }) {
	const history = useHistory();

	//Redirects user to room they click on
	const showRoomDetails = (e) => {
		let path = `/rooms/${room.id}`;
		history.push(path);
	};

	return (
		<div className="room" onClick={showRoomDetails}>
			<img
				src={room.previewImage}
				alt={`For room ${room.id}`}
				className="preview-image-main"
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
				<div className="room-detail price">
					<span
						style={{
							fontWeight: "600",
							paddingRight: "2px",
						}}
					>
						${room.price}{" "}
					</span>
					<span style={{ fontSize: ".875rem", alignSelf: "center" }}>
						{" "}
						night
					</span>
				</div>
			</div>
		</div>
	);
}

export default SingleRoom;
