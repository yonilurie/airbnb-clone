import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { getRooms } from "../../store/rooms";

const SingleRoomInfo = () => {
	const { roomId } = useParams();
	const currentRoom = useSelector((state) => state.rooms[roomId]);

	return (
		<>
			{currentRoom && (
				<div>
					<div>{currentRoom.name}</div>
					<div>Star</div>
					<div>
						{currentRoom.city},{currentRoom.state},
						{currentRoom.country}
					</div>
				</div>
			)}
		</>
	);
};

export default SingleRoomInfo;
