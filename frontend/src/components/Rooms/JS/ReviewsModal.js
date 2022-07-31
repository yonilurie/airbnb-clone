import React from "react";
import { Modal } from "../../../context/Modal";
import ShowReviewsModal from "./ShowReviewsModal";
function ReviewsModal({ showModal, setShowModal, currentRoom }) {
	return (
		< >
			{showModal && (
				<Modal onClose={() => setShowModal(false)}>
					<ShowReviewsModal
						showModal={showModal}
                        setShowModal={setShowModal}
                        currentRoom={currentRoom}
					></ShowReviewsModal>
				</Modal>
			)}
		</>
	);
}

export default ReviewsModal;
