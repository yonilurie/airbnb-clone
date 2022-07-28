import { useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getMyRoomsData } from "../../../store/myRooms";

import SingleRoom from "./SingleRoom";

import "../CSS/RoomContainer.css";

const MyRooms = () => {
	const dispatch = useDispatch();
	const sessionuser = useSelector((state) => state.session.user);
	
	useEffect(() => {
		dispatch(getMyRoomsData());
	}, []);

	//If the user is not logged in, redirect the user to home page

	const rooms = Object.values(useSelector((state) => state.myRooms));
	if (!sessionuser) return <Redirect to="/" />;

	return (
		<div className="rooms-container">
			{rooms &&
				rooms.length > 0 &&
				rooms.map((room) => {
					return <SingleRoom room={room} key={room.id}></SingleRoom>;
				})}
		</div>
	);
};

export default MyRooms;
