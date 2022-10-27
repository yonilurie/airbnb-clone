import { Modal } from "../../../context/Modal";
import CreateReview from "..";
const ReviewModal = ({
	review,
	showReviewModal,
	setShowReviewModal,
	roomId,
}) => {
	return (
		<>
			{showReviewModal && (
				<Modal onClose={() => setShowReviewModal(false)}>
					<CreateReview
						userReview={review}
						roomId={roomId}
						setShowReviewModal={setShowReviewModal}
					></CreateReview>
				</Modal>
			)}
		</>
	);
};

export default ReviewModal;
