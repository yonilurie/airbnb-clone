const RoomAmenities = ({ setAmenities, amenities }) => {
	const toggleAmenity = (amenity) => {
		let res = amenities.find((element) => element === amenity);
		if (res) {
			console.log(true);
		} else {
			setAmenities([...amenities, amenity]);
		}
	};

	return (
		<div className="input-container amenities">
			<label className="amenity-radio-container">
				Kitchen
				<input
					type="checkbox"
					value="kitchen"
					onClick={(e) => toggleAmenity(e.target.value)}
				></input>
				<span className="checkmark"></span>
			</label>
			<label className="amenity-radio-container">
				Wifi
				<input type="checkbox"></input>
				<span className="checkmark"></span>
			</label>
			<label className="amenity-radio-container">
				Dryer
				<input type="checkbox"></input>
				<span className="checkmark"></span>
			</label>
			<label className="amenity-radio-container">
				Washer
				<input type="checkbox"></input>
				<span className="checkmark"></span>
			</label>
			<label className="amenity-radio-container">
				Hairdryer
				<input type="checkbox"></input>
				<span className="checkmark"></span>
			</label>
			<label className="amenity-radio-container">
				Tv
				<input type="checkbox"></input>
				<span className="checkmark"></span>
			</label>
			<label className="amenity-radio-container">
				Free Parking
				<input type="checkbox"></input>
				<span className="checkmark"></span>
			</label>
			<label className="amenity-radio-container">
				Extra pillows and blankets
				<input type="checkbox"></input>
				<span className="checkmark"></span>
			</label>
		</div>
	);
};

export default RoomAmenities;
