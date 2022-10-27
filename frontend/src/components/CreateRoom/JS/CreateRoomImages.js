import CreateRoomGallery from "./CreateRoomGallery";

const CreateRoomImages = ({ images, setImages , setImageErrors}) => {
	const updateFile = (e) => {
		const file = e.target.files[0];
		if (!file) return;

		let testImage = new Image();
		// If file size is too large show an error
		testImage.onload = function () {
			if (file.size > 5000000) {
				return setImageErrors(["File size must be less than 5 MB"]);
			}
			setImageErrors([]);
			setImages([...images, file]);
		};
		// If image does not load show an error
		testImage.onerror = function () {
			return setImageErrors(["Invalid Image, please try another one"]);
		};
		//Create image to run previous tests
		testImage.src = URL.createObjectURL(file);
	};

	return (
		<div className="input-container">
			<label htmlFor="images" className="form-label">
				Images - First image will be preview
			</label>
			{images.length !== 5 && (
				<label htmlFor="images" className="image-input-select">
					Choose Images
				</label>
			)}
			{images && (
				<CreateRoomGallery
					images={images}
					setImages={setImages}
				></CreateRoomGallery>
			)}
			<input
				type="file"
				id="images"
				accept="image/png, image/jpg, image/jpeg"
				onChange={updateFile}
			></input>
		</div>
	);
};

export default CreateRoomImages;
