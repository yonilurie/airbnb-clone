import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getMyRoomsData } from "../../store/session";

import MyRoom from "./JS/MyRoom";

import "./CSS/RoomContainer.css";

const MyRooms = () => {
	const dispatch = useDispatch();
	const history = useHistory();

	const [isDisplayed, setIsDisplayed] = useState(false);

	const rooms = useSelector((state) => state.session.rooms);

	useEffect(() => {
		dispatch(getMyRoomsData()).then(() => {
			setIsDisplayed(true);
		});
	}, [dispatch]);

	useEffect(() => {
		if (document.title !== "My Rooms") document.title = "My Rooms";
	}, []);

	return (
		<div className="my-rooms-main-container">
			<h1>Your rooms</h1>
			{isDisplayed && rooms && Object.values(rooms).length > 0 && (
				<div className="my-rooms-container">
					{Object.values(rooms).map((room) => {
						return <MyRoom room={room} key={room.id}></MyRoom>;
					})}
				</div>
			)}
			{isDisplayed && rooms && Object.values(rooms).length === 0 && (
				<div className="no-hosted-rooms-container">
					<h2>You are not currently hosting</h2>
					<button
						className="submit-form-btn"
						onClick={() => history.push("/host-your-home")}
					>
						Start hosting
					</button>
				</div>
			)}

			{!isDisplayed && (
				<div className="loading-container">
					<div className="lds-ring">
						<div></div>
						<div></div>
						<div></div>
						<div></div>
					</div>
				</div>
			)}
		</div>
	);
};

export default MyRooms;
