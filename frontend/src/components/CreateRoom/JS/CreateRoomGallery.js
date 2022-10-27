const CreateRoomGallery = ({ images, setImages }) => {
	return (
		<div className="create-room-gallery">
			{Array.from(images).map((img, idx) => {
				return (
					<div
						id={idx}
						className="gallery-image-container"
						key={URL.createObjectURL(img)}
					>
						<div
							className="delete-gallery-image"
							onClick={() => {
								let newArr = Array.from(images);
								newArr.splice(idx, 1);
								setImages(newArr);
							}}
						>
							X
						</div>
						<a
							href={URL.createObjectURL(img)}
							target="_blank"
							rel="noreferrer"
						>
							<img
								className="create-room-image"
								src={URL.createObjectURL(img)}
								alt="preview"
							></img>
						</a>
					</div>
				);
			})}
		</div>
	);
};

export default CreateRoomGallery;
