import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRooms } from "../../store/rooms";
import SingleRoom from "./JS/SingleRoom";
import LoadingCircle from "../Loading/JS/LoadingCircle";
import Footer from "../Footer";
import "./CSS/RoomContainer.css";

function Rooms() {
	const dispatch = useDispatch();

	const [isDisplayed, setIsDisplayed] = useState(false);

	const rooms = Object.values(useSelector((state) => state.rooms));

	useEffect(() => {
		dispatch(getRooms());
	}, [dispatch]);

	useEffect(() => {
		if (document.title !== "Airbnb Clone") {
			document.title = "Airbnb Clone";
		}
	}, []);

	useEffect(() => {
		if (!rooms.length) {
			const timeout = setTimeout(() => {
				setIsDisplayed(true);
			}, 250);

			return () => clearTimeout(timeout);
		} else setIsDisplayed(true);
	}, []);
	return (
		<div className="rooms-main-container">
			<div className="rooms-container">
				{rooms.length > 0 &&
					isDisplayed &&
					rooms.map((room) => {
						return (
							<SingleRoom room={room} key={room.id}></SingleRoom>
						);
					})}
			</div>
			{!rooms.length && <LoadingCircle />}
			<Footer></Footer>
		</div>
	);
}

export default Rooms;
