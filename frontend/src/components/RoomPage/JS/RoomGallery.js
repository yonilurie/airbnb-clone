import ImageModal from "./ImageModal.js";
import { useState } from "react";
const RoomGallery = ({ gallery }) => {
	const [galleryImage, setGalleryImage] = useState(0);
	const [showImageModal, setShowImageModal] = useState(false);

	const setGalleryIndex = (dir) => {
		if (dir === "left" && galleryImage !== 0) {
			return setGalleryImage((galleryImage) => galleryImage - 1);
		}
		if (dir === "right" && galleryImage !== gallery.length - 1) {
			return setGalleryImage((galleryImage) => galleryImage + 1);
		}
	};

	return (
		<div className="gallery">
			<img
				className="gallery-img"
				src={gallery[galleryImage]}
				onClick={() => setShowImageModal(true)}
				alt='current gallery'
			></img>
			<ImageModal
				showImageModal={showImageModal}
				setShowImageModal={setShowImageModal}
				image={gallery[galleryImage]}
			></ImageModal>
			{gallery.length > 1 && (
				<>
					<div
						className="gallery-nav left"
						onClick={() => setGalleryIndex("left")}
					>
						{"<"}
					</div>
					<div
						className="gallery-nav right"
						onClick={() => setGalleryIndex("right")}
					>
						{">"}
					</div>
				</>
			)}
		</div>
	);
};

export default RoomGallery;
