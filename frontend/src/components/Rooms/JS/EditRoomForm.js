import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, useHistory, useParams } from "react-router-dom";

import { getRoomInfo } from "../../../store/CurrentRoom";
import { editRoom } from "../../../store/rooms";
import { getMyRoomsData } from "../../../store/session";

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
	const [previewImage, setPreviewImage] = useState("");
	const [validationErrors, setValidationErrors] = useState([]);
	const [isLoaded, setIsLoaded] = useState(false);

	const sessionuser = useSelector((state) => state.session.user);
	const { roomId } = useParams();

	const currentRoom = useSelector((state) => state.currentRoom);

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
				previewImage,
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
			setPreviewImage(previewImage);
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
	]);

	//If user is not logged in or is not the owner of the room, redirect them
	if (
		!sessionuser ||
		(currentRoom.ownerId && currentRoom.ownerId !== sessionuser.id)
	) {
		return <Redirect to="/"></Redirect>;
	}

	//When form is submitted
	const onSubmit = async (e) => {
		e.preventDefault();
		const { id } = currentRoom;
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
		};

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
				validationErrors.map((error) => {
					return <div key={error}>{error}</div>;
				})}
			<form className="create-room-form" onSubmit={onSubmit}>
				<div className="input-container-flex">
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
					<div className="input-container">
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
					<div className="input-container">
						{" "}
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

					<div className="input-container">
						<label htmlFor="state" className="form-label">
							State
						</label>

						{country === "United States" && (
							<>
								<select
									name="state"
									className="form-input"
									id="state"
									value={state}
									required
									onChange={(e) => setState(e.target.value)}
								>
									<option value="AL">Alabama</option>
									<option value="AK">Alaska</option>
									<option value="AZ">Arizona</option>
									<option value="AR">Arkansas</option>
									<option value="CA">California</option>
									<option value="CO">Colorado</option>
									<option value="CT">Connecticut</option>
									<option value="DE">Delaware</option>
									<option value="FL">Florida</option>
									<option value="GA">Georgia</option>
									<option value="HI">Hawaii</option>
									<option value="ID">Idaho</option>
									<option value="IL">Illinois</option>
									<option value="IN">Indiana</option>
									<option value="IA">Iowa</option>
									<option value="KS">Kansas</option>
									<option value="KY">Kentucky</option>
									<option value="LA">Louisiana</option>
									<option value="ME">Maine</option>
									<option value="MD">Maryland</option>
									<option value="MA">Massachusetts</option>
									<option value="MI">Michigan</option>
									<option value="MN">Minnesota</option>
									<option value="MS">Mississippi</option>
									<option value="MO">Missouri</option>
									<option value="MT">Montana</option>
									<option value="NE">Nebraska</option>
									<option value="NV">Nevada</option>
									<option value="NH">New Hampshire</option>
									<option value="NJ">New Jersey</option>
									<option value="NM">New Mexico</option>
									<option value="NY">New York</option>
									<option value="NC">North Carolina</option>
									<option value="ND">North Dakota</option>
									<option value="OH">Ohio</option>
									<option value="OK">Oklahoma</option>
									<option value="OR">Oregon</option>
									<option value="PA">Pennsylvania</option>
									<option value="RI">Rhode Island</option>
									<option value="SC">South Carolina</option>
									<option value="SD">South Dakota</option>
									<option value="TN">Tennessee</option>
									<option value="TX">Texas</option>
									<option value="UT">Utah</option>
									<option value="VT">Vermont</option>
									<option value="VA">Virginia</option>
									<option value="WA">Washington</option>
									<option value="WV">West Virginia</option>
									<option value="WI">Wisconsin</option>
									<option value="WY">Wyoming</option>
								</select>
							</>
						)}
					</div>

					<div className="input-container">
						{" "}
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
									if (
										e.target.value.length >
										e.target.maxLength
									) {
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
									if (
										e.target.value.length >
										e.target.maxLength
									) {
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
					<div className="input-container price">
						<label htmlFor="price" className="form-label">
							Price per Night
						</label>

						<input
							type="number"
							className="form-input"
							min="1"
							max="1000"
							step="1"
							value={price}
							maxLength="4"
							onInput={(e) => {
								if (
									e.target.value.length > e.target.maxLength
								) {
									e.target.value = e.target.value.slice(
										0,
										e.target.maxLength
									);
								}
							}}
							id="price"
							onChange={(e) => setPrice(e.target.value)}
							required
						></input>
					</div>
					<div className="input-container">
						{" "}
						<label htmlFor="description" className="form-label">
							Description
						</label>
						<textarea
							type="textArea"
							className="form-input"
							id="description"
							value={description}
							onChange={(e) => setDescription(e.target.value)}
							required
						></textarea>
					</div>
				</div>
				<button className="submit-form-btn">
					Submit Changes
				</button>
			</form>
		</div>
	);
};

export default EditRoomForm;
