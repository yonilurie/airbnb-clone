import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, useHistory, useParams } from "react-router-dom";

import { getRoomInfo } from "../../../store/CurrentRoom";
import Errors from "../../Errors";
import { editRoom } from "../../../store/rooms";
import { getMyRoomsData } from "../../../store/session";
import StateSelector from "./StateSelector";
import CreateRoomName from "./CreateRoomName";
import CreateRoomAddress from "./CreateRoomAddress";
import CreateRoomCity from "./CreateRoomCity";
import CreateRoomCountry from "./CreateRoomCountry";
import CreateRoomCoordinates from "./CreateRoomCoordinates";
import CreateRoomPrice from "./CreateRoomPrice";
import RoomSize from "./RoomSize";
import RoomAmenities from "./RoomAmenities";
import CreateRoomDescription from "./CreateRoomDescription";

const EditRoomForm = () => {
	const history = useHistory();
	const dispatch = useDispatch();

	// State
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

	const [kitchen, setKitchen] = useState(false);
	const [wifi, setWifi] = useState(false);
	const [dryer, setDryer] = useState(false);
	const [washer, setWasher] = useState(false);
	const [hairdryer, setHairdryer] = useState(false);
	const [TV, setTV] = useState(false);
	const [freeParking, setFreeParking] = useState(false);
	const [pillowsAndBlankets, setPillowsAndBlankets] = useState(false);

	// const [amenities, setAmenities] = useState([]);
	const [validationErrors, setValidationErrors] = useState([]);
	const [isLoaded, setIsLoaded] = useState(false);

	const sessionuser = useSelector((state) => state.session.user);
	const { roomId } = useParams();

	const currentRoom = useSelector((state) => state.currentRoom);

	useEffect(() => {
		if (currentRoom.amenities) {
			currentRoom.amenities.forEach((amenity) => {
				if (amenity.type === "Kitchen") return setKitchen(true);
				if (amenity.type === "Wifi") return setWifi(true);
				if (amenity.type === "Dryer") return setDryer(true);
				if (amenity.type === "Washer") return setWasher(true);
				if (amenity.type === "Hairdryer") return setHairdryer(true);
				if (amenity.type === "TV") return setTV(true);
				if (amenity.type === "Free Parking")
					return setFreeParking(true);
				if (amenity.type === "Extra pillows and blankets")
					return setPillowsAndBlankets(true);
			});
		}
	}, [currentRoom]);

	// On initial render set isLoaded to false
	useEffect(() => {
		setIsLoaded(false);
	}, []);

	useEffect(() => {
		if (document.title !== "Edit your Room")
			document.title = "Edit your Room";
	}, []);

	//Get the info of the current room
	useEffect(() => {
		dispatch(getRoomInfo(roomId));
	}, [dispatch, roomId]);

	//Once room is loaded update state with the rooms information
	//This information will now show up in the form inputs
	//so the user does not have to type them in again
	useEffect(() => {
		//If the currentRoom is loaded and and has an Id
		//Destructure it
		if (currentRoom.id) {
			const {
				name,
				address,
				city,
				state,
				country,
				lat,
				lng,
				description,
				price,
				guests,
				bedrooms,
				beds,
				baths,
			} = currentRoom;

			//Set all the states with the rooms information
			setName(name);
			setAddress(address);
			setCity(city);
			setState(state);
			setCountry(country);
			setLatitude(lat);
			setLongitude(lng);
			setDescription(description);
			setPrice(price);
			setGuests(guests);
			setBedrooms(bedrooms);
			setBeds(beds);
			setBaths(baths);
		}
	}, [currentRoom]);

	// Validate user form input and render errors if they are present
	useEffect(() => {
		const errors = [];
		if (name.length > 50 || name.length < 4) {
			errors.push("Name must be between 4 and 50 characters");
		}
		if (description.length > 500 || description.length < 10) {
			errors.push("Description must be between 10 and 500 characters");
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
	]);

	//If user is not logged in or is not the owner of the room, redirect them
	if (currentRoom.ownerId && currentRoom.ownerId !== sessionuser.id) {
		return <Redirect to="/"></Redirect>;
	}

	//When form is submitted
	const onSubmit = async (e) => {
		e.preventDefault();
		const { id } = currentRoom;

		if (!validationErrors.length) {
			const checkIfLocationTaken = await fetch(
				`/api/rooms/search?minLat=${latitude}&maxLat=${latitude}&minLng=${longitude}&maxLng=${longitude}`
			);
			const checkIfLocationTakenData = await checkIfLocationTaken.json();

			if (
				checkIfLocationTakenData.rooms.length > 0 &&
				Number(checkIfLocationTakenData.rooms[0].lat) !==
					Number(currentRoom.lat) &&
				Number(checkIfLocationTakenData.rooms[0].lng) !==
					Number(currentRoom.lng)
			) {
				setValidationErrors([
					"This location is already taken, Check latitude and longitude",
				]);
				setIsLoaded(true);
				document.body.scrollTop = 0;
				document.documentElement.scrollTop = 0;
				return;
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

			const room = {
				id,
				name,
				address,
				city,
				state,
				country,
				lat: Number(latitude),
				lng: Number(longitude),
				description,
				price,
				guests,
				bedrooms,
				baths,
				beds,
				amenities,
			};

			dispatch(editRoom(JSON.stringify(room)));

			setName("");
			setAddress("");
			setCity("");
			setState("WA");
			setCountry("United States");
			setLatitude(0);
			setLongitude(0);
			setDescription("");
			setPrice(100);

			dispatch(getRoomInfo(roomId));
			//Redirect user to home page
			dispatch(getMyRoomsData());
			history.push(`/rooms/${roomId}`);
		} else {
			document.body.scrollTop = 0;
			document.documentElement.scrollTop = 0;
			setIsLoaded(true);
		}
	};

	return (
		<div className="form-container">
			<h1 className="form-description">Edit home information</h1>
			{isLoaded &&
				validationErrors.length > 0 &&
				validationErrors.map((error) => (
					<Errors error={error}></Errors>
				))}
			<form className="create-room-form" onSubmit={onSubmit}>
				<CreateRoomName name={name} setName={setName}></CreateRoomName>
				<CreateRoomAddress
					address={address}
					setAddress={setAddress}
				></CreateRoomAddress>
				<CreateRoomCity city={city} setCity={setCity}></CreateRoomCity>
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
					kitchen={kitchen}
					setWifi={setWifi}
					wifi={wifi}
					setDryer={setDryer}
					dryer={dryer}
					setWasher={setWasher}
					washer={washer}
					setHairdryer={setHairdryer}
					hairdryer={hairdryer}
					setTV={setTV}
					TV={TV}
					setFreeParking={setFreeParking}
					freeParking={freeParking}
					setPillowsAndBlankets={setPillowsAndBlankets}
					pillowsAndBlankets={pillowsAndBlankets}
				></RoomAmenities>
				<CreateRoomDescription
					description={description}
					setDescription={setDescription}
				></CreateRoomDescription>

				<button className="submit-form-btn">Submit Changes</button>
			</form>
		</div>
	);
};

export default EditRoomForm;
