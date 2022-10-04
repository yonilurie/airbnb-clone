import { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getMyRoomsData } from "../../../store/session";

import MyRoom from "./MyRoom";

import "../CSS/RoomContainer.css";

const MyRooms = () => {
	const dispatch = useDispatch();
	const sessionuser = useSelector((state) => state.session.user);

	const rooms = useSelector((state) => state.session.rooms);

	useEffect(() => {
		if (!Object.values(rooms).length) {
			dispatch(getMyRoomsData());
		}
	}, [dispatch]);

	useEffect(() => {
		if (document.title !== "My Rooms") document.title = "My Rooms";
	}, []);

	//If the user is not logged in, redirect the user to home page

	if (!sessionuser) return <Redirect to="/" />;

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
					<button className="submit-form-btn">Start hosting</button>
				</div>
			)}
		</div>
	);
};

export default MyRooms;
