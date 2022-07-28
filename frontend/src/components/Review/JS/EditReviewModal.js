import React from "react";
import { Modal } from "../../../context/Modal";
import EditReviewFormModal from "./EditReviewFormModal";

function EditReviewForm({ showModal, setShowModal, review }) {
	return (
		<>
			{showModal && (
				<Modal onClose={() => setShowModal(false)}>
					<EditReviewFormModal
						review={review}
						showModal={showModal}
						setShowModal={setShowModal}
					></EditReviewFormModal>
				</Modal>
			)}
		</>
	);
}

export default EditReviewForm;
