import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";

import { getRoomInfo, getARoomsBookings } from "../../store/CurrentRoom";

import ReviewsModal from "./JS/ReviewsModal";

import Placeholder from "./JS/Placeholder";

import "./CSS/SingleRoomInfo.css";

import RoomContent from "./JS/RoomContent";

const RoomPage = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const [showModal, setShowModal] = useState(false);

	const currentRoom = useSelector((state) => state.currentRoom);

	const { roomId } = useParams();

	//Get room info, images, and reviews
	useEffect(() => {
		dispatch(getRoomInfo(Number(roomId))).then(() =>
			dispatch(getARoomsBookings(Number(roomId)))
		);
	}, [dispatch, roomId]);

	if (isNaN(Number(roomId))) history.push("/");
	if (currentRoom.errors) history.push("/");
	if (currentRoom.name) document.title = `${currentRoom.name}`;

	return (
		<div className="content-container">
			<ReviewsModal
				showModal={showModal}
				setShowModal={setShowModal}
				currentRoom={currentRoom}
			></ReviewsModal>
			{!currentRoom.id ? (
				<Placeholder></Placeholder>
			) : (
				currentRoom &&
				Number(currentRoom.id) === Number(roomId) && (
					<RoomContent
						setShowModal={setShowModal}
						room={currentRoom}
					></RoomContent>
				)
			)}
		</div>
	);
};

export default RoomPage;
