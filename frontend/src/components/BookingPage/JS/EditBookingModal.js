import EditBooking from "./EditBooking";
import { Modal } from "../../../context/Modal";

const EditBookingModal = ({ showModal, setShowModal, booking }) => {
	return (
		<>
			{showModal && (
				<Modal onClose={() => setShowModal(false)}>
					<EditBooking
						booking={booking}
						setShowModal={setShowModal}
					></EditBooking>
				</Modal>
			)}
		</>
	);
};

export default EditBookingModal;
