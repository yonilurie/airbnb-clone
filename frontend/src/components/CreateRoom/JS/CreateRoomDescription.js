const CreateRoomDescription = ({ description, setDescription }) => {
	return (
		<div className="input-container">
			<label htmlFor="description" className="form-label">
				Description
			</label>
			<textarea
				type="textArea"
				className="form-input"
				id="description"
				value={description}
				onChange={(e) => setDescription(e.target.value)}
				required
			></textarea>
		</div>
	);
};

export default CreateRoomDescription;
