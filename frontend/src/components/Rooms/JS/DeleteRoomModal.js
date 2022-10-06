import { Modal } from "../../../context/Modal";

const DeleteRoomModal = ({ showModal, setShowModal }) => {
	return (
		<>
			{showModal && (
				<Modal onClose={() => setShowModal(false)}>
					<div className="delete-room-modal-container">
						<h2> Are you sure you want to delete this room?</h2>
						<div>
							This will delete all associated bookings as well
						</div>
						<button className="delete-btn">Delete room</button>
					</div>
				</Modal>
			)}
		</>
	);
};

export default DeleteRoomModal;
