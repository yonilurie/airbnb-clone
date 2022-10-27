const CreateRoomCity = ({ city, setCity }) => {
	return (
		<div className="country-container">
			<label htmlFor="city" className="form-label">
				City
			</label>
			<input
				type="text"
				className="form-input"
				id="city"
				placeholder="City"
				value={city}
				onChange={(e) => setCity(e.target.value)}
				required
			></input>
		</div>
	);
};

export default CreateRoomCity;
