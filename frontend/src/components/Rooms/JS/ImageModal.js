import { Modal } from "../../../context/Modal";

import "../CSS/ImageModal.css";

const ImageModal = ({ image, showImageModal, setShowImageModal }) => {
	return (
		<>
			{showImageModal && (
				<Modal onClose={() => setShowImageModal(false)}>
					{/* <div
						className="image-modal-container"
					
					> */}
					<div
						className="modal-exit-btn"
						onClick={() => setShowImageModal(false)}
					>
						x
					</div>
					<img src={image} className="modal-img"></img>
					{/* </div> */}
				</Modal>
			)}
		</>
	);
};

export default ImageModal;
