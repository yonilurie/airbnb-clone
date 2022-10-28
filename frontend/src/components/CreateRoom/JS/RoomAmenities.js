const RoomAmenities = ({
	setKitchen,
	setWifi,
	setDryer,
	setWasher,
	setHairdryer,
	setTV,
	setFreeParking,
	setPillowsAndBlankets,
}) => {
	return (
		<div className="input-container amenities">
			<label className="amenity-radio-container">
				Kitchen
				<input
					type="checkbox"
					value="kitchen"
					onClick={(e) => setKitchen(e.target.checked)}
				></input>
				<span className="checkmark"></span>
			</label>
			<label className="amenity-radio-container">
				Wifi
				<input
					type="checkbox"
					onClick={(e) => setWifi(e.target.checked)}
				></input>
				<span className="checkmark"></span>
			</label>
			<label className="amenity-radio-container">
				Dryer
				<input
					type="checkbox"
					onClick={(e) => setDryer(e.target.checked)}
				></input>
				<span className="checkmark"></span>
			</label>
			<label className="amenity-radio-container">
				Washer
				<input
					type="checkbox"
					onClick={(e) => setWasher(e.target.checked)}
				></input>
				<span className="checkmark"></span>
			</label>
			<label className="amenity-radio-container">
				Hairdryer
				<input
					type="checkbox"
					onClick={(e) => setHairdryer(e.target.checked)}
				></input>
				<span className="checkmark"></span>
			</label>
			<label className="amenity-radio-container">
				Tv
				<input
					type="checkbox"
					onClick={(e) => setTV(e.target.checked)}
				></input>
				<span className="checkmark"></span>
			</label>
			<label className="amenity-radio-container">
				Free Parking
				<input
					type="checkbox"
					onClick={(e) => setFreeParking(e.target.checked)}
				></input>
				<span className="checkmark"></span>
			</label>
			<label className="amenity-radio-container">
				Extra pillows and blankets
				<input
					type="checkbox"
					onClick={(e) => setPillowsAndBlankets(e.target.checked)}
				></input>
				<span className="checkmark"></span>
			</label>
		</div>
	);
};

export default RoomAmenities;
