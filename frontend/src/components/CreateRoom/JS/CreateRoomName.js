const CreateRoomName = ({ name, setName }) => {
	return (
		<div className="input-container">
			<label htmlFor="name" className="form-label">
				Name
			</label>
			<input
				type="text"
				className="form-input"
				id="name"
				placeholder="Name of your Home"
				value={name}
				onChange={(e) => {
					setName(e.target.value);
				}}
				required
			></input>
		</div>
	);
};

export default CreateRoomName;
