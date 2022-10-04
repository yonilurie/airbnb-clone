import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getMyRoomsData } from "../../../store/session";

import MyRoom from "./MyRoom";

import "../CSS/RoomContainer.css";

const MyRooms = () => {
	const dispatch = useDispatch();
	const history = useHistory();

	const rooms = useSelector((state) => state.session.rooms);

	useEffect(() => {
		if (!rooms) dispatch(getMyRoomsData());
	}, [dispatch, rooms]);

	useEffect(() => {
		if (document.title !== "My Rooms") document.title = "My Rooms";
	}, []);

	return (
		<div className="rooms-main-container">
			<h1>Your rooms</h1>
			{rooms && Object.values(rooms).length > 0 && (
				<div className="my-rooms-container">
					{Object.values(rooms).map((room) => {
						return <MyRoom room={room} key={room.id}></MyRoom>;
					})}
				</div>
			)}
			{rooms && Object.values(rooms).length === 0 && (
				<div className="no-rooms-container">
					<h2>You are not currently hosting</h2>
					<button
						className="submit-form-btn"
						onClick={() => history.push("/host-your-home")}
					>
						Start hosting
					</button>
				</div>
			)}
		</div>
	);
};

export default MyRooms;
