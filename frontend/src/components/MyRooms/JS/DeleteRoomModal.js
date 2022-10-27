import { useDispatch } from "react-redux";
import { deleteARoom, getMyRoomsData } from "../../../store/session";
import { Modal } from "../../../context/Modal";

import '../CSS/DeleteRoomModal.css'

const DeleteRoomModal = ({ showModal, setShowModal, room }) => {
	const dispatch = useDispatch();

	return (
		<>
			{showModal && (
				<Modal onClose={() => setShowModal(false)}>
					<div className="delete-room-modal-container">
						<h2> Are you sure you want to delete this room?</h2>
						<div>
							This will delete all associated bookings as well
						</div>
						<button
							className="delete-btn"
							onClick={() =>
								dispatch(deleteARoom(room.id)).then(
									dispatch * getMyRoomsData()
								)
							}
						>
							Delete room
						</button>
					</div>
				</Modal>
			)}
		</>
	);
};

export default DeleteRoomModal;
