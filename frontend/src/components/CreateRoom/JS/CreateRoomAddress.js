const CreateRoomAddress= ({address, setAddress}) => {
	return (
		<div className="country-container">
			<label htmlFor="address" className="form-label">
				Address
			</label>
			<input
				type="text"
				className="form-input"
				id="address"
				placeholder="Address"
				value={address}
				onChange={(e) => setAddress(e.target.value)}
				required
			></input>
		</div>
	);
};

export default CreateRoomAddress;
