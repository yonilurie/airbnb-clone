const CreateRoomCoordinates = ({
	latitude,
	setLatitude,
	longitude,
	setLongitude,
}) => {
	return (
		<div className="lat-lng-container input-container">
			<div className="input-container">
				{" "}
				<label htmlFor="latitude" className="form-label">
					Latitude
				</label>
				<input
					type="number"
					className="form-input"
					min="-90"
					max="90"
					step="0.01"
					maxLength="9"
					onInput={(e) => {
						if (e.target.value.length > e.target.maxLength) {
							e.target.value = e.target.value.slice(
								0,
								e.target.maxLength
							);
						}
					}}
					id="latitude"
					placeholder="Latitude -90 to 90"
					value={latitude}
					onChange={(e) => setLatitude(e.target.value)}
					required
				></input>
			</div>
			<div className="input-container">
				{" "}
				<label htmlFor="longitude" className="form-label">
					Longitude
				</label>
				<input
					type="number"
					className="form-input"
					min="-180"
					max="180"
					step="0.01"
					maxLength="9"
					onInput={(e) => {
						if (e.target.value.length > e.target.maxLength) {
							e.target.value = e.target.value.slice(
								0,
								e.target.maxLength
							);
						}
					}}
					id="longitude"
					placeholder="Longitude -180 to 180"
					value={longitude}
					onChange={(e) => setLongitude(e.target.value)}
					required
				></input>
			</div>
		</div>
	);
};

export default CreateRoomCoordinates;
