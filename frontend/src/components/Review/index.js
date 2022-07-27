import React from "react";
import { Modal } from "../../context/Modal";
import ReviewForm from "./ReviewForm";

function ReviewFormModal({ showModal, setShowModal }) {
	return (
		<>
			{showModal && (
				<Modal onClose={() => setShowModal(false)}>
					<ReviewForm setShowModal={setShowModal} />
				</Modal>
			)}
		</>
	);
}

export default ReviewFormModal;
