const CreateRoomCountry = ({ country, setCountry }) => {
	return (
		<div className="country-container">
			<label htmlFor="country" className="form-label">
				Country
			</label>
			<select
				id="country"
				className="form-input"
				name="country"
				value={country}
				onChange={(e) => setCountry(e.target.value)}
				required
			>
				<option value="United States">United States</option>
			</select>
		</div>
	);
};

export default CreateRoomCountry;
