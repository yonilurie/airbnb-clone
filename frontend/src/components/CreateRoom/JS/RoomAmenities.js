const RoomAmenities = ({
	setKitchen,
	kitchen,
	setWifi,
	wifi,
	setDryer,
	dryer,
	setWasher,
	washer,
	setHairdryer,
	hairdryer,
	setTV,
	TV,
	setFreeParking,
	freeParking,
	setPillowsAndBlankets,
	pillowsAndBlankets,
}) => {
	return (
		<div className="input-container amenities">
			<label className="amenity-radio-container">
				Kitchen
				<input
					type="checkbox"
					checked={kitchen}
					onChange={(e) => setKitchen(e.target.checked)}
				></input>
				<span className="checkmark"></span>
			</label>
			<label className="amenity-radio-container">
				Wifi
				<input
					type="checkbox"
					checked={wifi}
					onChange={(e) => setWifi(e.target.checked)}
				></input>
				<span className="checkmark"></span>
			</label>
			<label className="amenity-radio-container">
				Dryer
				<input
					type="checkbox"
					checked={dryer}
					onChange={(e) => setDryer(e.target.checked)}
				></input>
				<span className="checkmark"></span>
			</label>
			<label className="amenity-radio-container">
				Washer
				<input
					type="checkbox"
					checked={washer}
					onChange={(e) => setWasher(e.target.checked)}
				></input>
				<span className="checkmark"></span>
			</label>
			<label className="amenity-radio-container">
				Hairdryer
				<input
					type="checkbox"
					checked={hairdryer}
					onChange={(e) => setHairdryer(e.target.checked)}
				></input>
				<span className="checkmark"></span>
			</label>
			<label className="amenity-radio-container">
				Tv
				<input
					type="checkbox"
					checked={TV}
					onChange={(e) => setTV(e.target.checked)}
				></input>
				<span className="checkmark"></span>
			</label>
			<label className="amenity-radio-container">
				Free Parking
				<input
					type="checkbox"
					checked={freeParking}
					onChange={(e) => setFreeParking(e.target.checked)}
				></input>
				<span className="checkmark"></span>
			</label>
			<label className="amenity-radio-container">
				Extra pillows and blankets
				<input
					type="checkbox"
					checked={pillowsAndBlankets}
					onChange={(e) => setPillowsAndBlankets(e.target.checked)}
				></input>
				<span className="checkmark"></span>
			</label>
		</div>
	);
};

export default RoomAmenities;
