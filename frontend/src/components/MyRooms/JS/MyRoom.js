import { useState } from "react";
import { useHistory } from "react-router-dom";

import "../CSS/MyRoom.css";

import "./DeleteRoomModal";
import DeleteRoomModal from "./DeleteRoomModal";

function MyRoom({ room }) {
	const history = useHistory();

	const [showModal, setShowModal] = useState(false);

	//Redirects user to room they click on
	const showRoomDetails = (e) => {
		let path = `/rooms/${room.id}`;
		history.push(path);
	};

	return (
		<div className="my-room">
			<div className="my-room-left" onClick={showRoomDetails}>
				<img
					src={room.previewImage}
					alt={`For room ${room.id}`}
					className="preview-image-my-room"
				></img>
			</div>
			<div className="my-room-right">
				<div className="room-detail name">{room.name}</div>
				<div className="room-detail name">
					{room.city}, {room.state}
				</div>
				<div className="room-detail price"> ${room.price} Night</div>
				<div className="room-detail-actions">
					<DeleteRoomModal
						showModal={showModal}
						setShowModal={setShowModal}
						room={room}
					></DeleteRoomModal>
					<button
						className="my-room-btn"
						onClick={() => setShowModal(true)}
					>
						Delete
					</button>
					<button
						className="my-room-btn"
						onClick={() => {
							history.push(`/rooms/${room.id}/edit`);
						}}
					>
						Edit
					</button>
				</div>
			</div>
		</div>
	);
}

export default MyRoom;
