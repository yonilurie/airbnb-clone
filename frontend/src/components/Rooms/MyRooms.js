import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getMyRoomsData } from "../../store/myRooms";

import SingleRoom from "./SingleRoom";

import "./RoomContainer.css";

const MyRooms = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getMyRoomsData());
	}, []);

	const rooms = Object.values(useSelector((state) => state.myRooms));

	return (
		<div className="rooms-container">
			{rooms &&
				rooms.length > 0 &&
				rooms.map((room) => {
					return (
							<SingleRoom room={room} key={room.id}></SingleRoom>
						);
				})}
		</div>
	);
};

export default MyRooms;
