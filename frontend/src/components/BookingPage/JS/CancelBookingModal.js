import { Modal } from "../../../context/Modal";
import CancelBooking from "./CancelBooking";
const CancelBookingModal = ({ showModal, setShowModal, booking }) => {
	return (
		<>
			{showModal && (
				<Modal onClose={() => setShowModal(false)}>
					<CancelBooking booking={booking}></CancelBooking>
				</Modal>
			)}
		</>
	);
};

export default CancelBookingModal;
