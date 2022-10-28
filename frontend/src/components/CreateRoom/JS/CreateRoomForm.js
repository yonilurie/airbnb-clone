import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { createRoom } from "../../../store/session";
import "../CSS/RoomForm.css";
import CreateRoomCity from "./CreateRoomCity";
import CreateRoomCoordinates from "./CreateRoomCoordinates";
import CreateRoomAddress from "./CreateRoomAddress";

import CreateRoomName from "./CreateRoomName";
import CreateRoomPrice from "./CreateRoomPrice";
import RoomAmenities from "./RoomAmenities";
import RoomSize from "./RoomSize";

import StateSelector from "./StateSelector";
import CreateRoomImages from "./CreateRoomImages";
import CreateRoomDescription from "./CreateRoomDescription";
import CreateRoomCountry from "./CreateRoomCountry";
import Errors from "../../Errors";

const CreateRoomForm = () => {
	const history = useHistory();
	const dispatch = useDispatch();

	const [name, setName] = useState("");
	const [address, setAddress] = useState("");
	const [city, setCity] = useState("");
	const [state, setState] = useState("WA");
	const [country, setCountry] = useState("United States");
	const [latitude, setLatitude] = useState(0);
	const [longitude, setLongitude] = useState(0);
	const [description, setDescription] = useState("");
	const [price, setPrice] = useState(100);
	const [guests, setGuests] = useState(1);
	const [bedrooms, setBedrooms] = useState(1);
	const [beds, setBeds] = useState(1);
	const [baths, setBaths] = useState(1);
	const [images, setImages] = useState([]);

	const [kitchen, setKitchen] = useState(false);
	const [wifi, setWifi] = useState(false);
	const [dryer, setDryer] = useState(false);
	const [washer, setWasher] = useState(false);
	const [hairdryer, setHairdryer] = useState(false);
	const [TV, setTV] = useState(false);
	const [freeParking, setFreeParking] = useState(false);
	const [pillowsAndBlankets, setPillowsAndBlankets] = useState(false);

	const [validationErrors, setValidationErrors] = useState([]);
	const [imageErrors, setImageErrors] = useState([]);

	useEffect(() => {
		if (document.title !== "Host your Home") {
			document.title = "Host your Home";
		}
	}, []);

	//Validate user form input and render errors if they are present
	useEffect(() => {
		const errors = [];

		if (name.length > 50 || name.length < 4) {
			errors.push("Name must be between 4 and 50 characters");
		}
		if (description.length > 500 || description.length < 10) {
			errors.push("Description must be between 10 and 500 characters");
		}
		if (images && images.length !== 5) {
			errors.push("Must include five files");
		}

		setValidationErrors(errors);
	}, [
		name,
		address,
		city,
		state,
		country,
		latitude,
		longitude,
		description,
		price,
		guests,
		bedrooms,
		beds,
		baths,
		images,
	]);

	//When form is submitted
	const onSubmit = async (e) => {
		e.preventDefault();
		if (images.length !== 5) {
			return setImageErrors(["Please use five images"]);
		}

		if (!validationErrors.length) {
			const checkIfLocationTaken = await fetch(
				`/api/rooms/search?minLat=${latitude}&maxLat=${latitude}&minLng=${longitude}&maxLng=${longitude}`
			);
			const checkIfLocationTakenData = await checkIfLocationTaken.json();
			console.log(checkIfLocationTakenData);
			if (checkIfLocationTakenData.rooms.length > 0) {
				setValidationErrors(["This location is already taken"]);
				document.body.scrollTop = 0;
				document.documentElement.scrollTop = 0;
				return;
			} else {
				setValidationErrors([]);
			}

			let amenities = [];

			if (kitchen) amenities.push("Kitchen");
			if (wifi) amenities.push("Wifi");
			if (dryer) amenities.push("Dryer");
			if (washer) amenities.push("Washer");
			if (hairdryer) amenities.push("Hairdryer");
			if (TV) amenities.push("TV");
			if (freeParking) amenities.push("Free Parking");
			if (pillowsAndBlankets)
				amenities.push("Extra pillows and blankets");
			console.log("Amenities", amenities);

			await dispatch(
				createRoom({
					name,
					address,
					city,
					state,
					country,
					lat: Number(latitude),
					lng: Number(longitude),
					description,
					price,
					images,
					guests,
					bedrooms,
					baths,
					beds,
					amenities,
				})
			);

			setName("");
			setAddress("");
			setCity("");
			setState("WA");
			setCountry("United States");
			setLatitude(0);
			setLongitude(0);
			setDescription("");
			setPrice(100);

			// Redirect user to rooms page
			history.push("/my-rooms");
		} else {
			document.body.scrollTop = 0;
			document.documentElement.scrollTop = 0;
		}
	};

	return (
		<div className="form-container">
			<h1 className="form-description">Host your home</h1>
			<div className="errors">
				{validationErrors.length > 0 &&
					validationErrors.map((error) => (
						<Errors error={error}></Errors>
					))}
				{imageErrors.length > 0 &&
					imageErrors.map((error) => <Errors error={error}></Errors>)}
			</div>
			<form className="create-room-form" onSubmit={onSubmit}>
				<CreateRoomName name={name} setName={setName}></CreateRoomName>
				<div className="input-container state-country">
					<CreateRoomAddress
						address={address}
						setAddress={setAddress}
					></CreateRoomAddress>
					<CreateRoomCity
						city={city}
						setCity={setCity}
					></CreateRoomCity>
				</div>
				<div className="input-container state-country">
					<CreateRoomCountry
						country={country}
						setCountry={setCountry}
					></CreateRoomCountry>
					<StateSelector
						state={state}
						setState={setState}
					></StateSelector>
				</div>
				<CreateRoomCoordinates
					latitude={latitude}
					setLatitude={setLatitude}
					longitude={longitude}
					setLongitude={setLongitude}
				></CreateRoomCoordinates>
				<CreateRoomPrice
					price={price}
					setPrice={setPrice}
				></CreateRoomPrice>
				<RoomSize
					guests={guests}
					setGuests={setGuests}
					bedrooms={bedrooms}
					setBedrooms={setBedrooms}
					beds={beds}
					setBeds={setBeds}
					baths={baths}
					setBaths={setBaths}
				></RoomSize>
				<RoomAmenities
					setKitchen={setKitchen}
					setWifi={setWifi}
					setDryer={setDryer}
					setWasher={setWasher}
					setHairdryer={setHairdryer}
					setTV={setTV}
					setFreeParking={setFreeParking}
					setPillowsAndBlankets={setPillowsAndBlankets}
				></RoomAmenities>
				<CreateRoomDescription
					description={description}
					setDescription={setDescription}
				></CreateRoomDescription>
				<CreateRoomImages
					images={images}
					setImages={setImages}
					setImageErrors={setImageErrors}
				></CreateRoomImages>
				<button className="submit-form-btn">Submit</button>
			</form>
		</div>
	);
};

export default CreateRoomForm;
