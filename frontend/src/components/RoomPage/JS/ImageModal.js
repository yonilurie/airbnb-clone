import { Modal } from "../../../context/Modal";

import "../CSS/ImageModal.css";

const ImageModal = ({ image, showImageModal, setShowImageModal }) => {
	return (
		<>
			{showImageModal && (
				<Modal onClose={() => setShowImageModal(false)}>
					<div
						className="modal-exit-btn"
						onClick={() => setShowImageModal(false)}
					>
						x
					</div>
					<img src={image} className="modal-img" alt='room modal'></img>
				</Modal>
			)}
		</>
	);
};

export default ImageModal;
