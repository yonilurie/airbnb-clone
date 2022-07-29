import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, useHistory, useParams } from "react-router-dom";

import { getRoomInfo } from "../../../store/CurrentRoom";
import { editRoom } from "../../../store/rooms";
import "../CSS/EditRoomForm.css";

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

	// On initial render set isLoaded to false
	useEffect(() => {
		setIsLoaded(false);
	}, []);

	//Get the info of the current room
	useEffect(() => {
		dispatch(getRoomInfo(roomId));
	}, [dispatch]);

	//Assign current room to variable
	const currentRoom = useSelector((state) => state.currentRoom);

	//Once room is loaded update state with the rooms information
	//This information will now show up in the form inputs
	//so the user does not have tot ype them in again
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
		if (description.length > 500) {
			errors.push("Description must be less that 500 characters");
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
	const onSubmit = (e) => {
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
			previewImage,
		};

		if (!validationErrors.length) {
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
			history.push(`/rooms/${roomId}`);
		} else {
			setIsLoaded(true);
		}
	};

	return (
		<div className="form-container">
			{isLoaded &&
				validationErrors.length > 0 &&
				validationErrors.map((error) => {
					return <div key={error}>{error}</div>;
				})}
			<h1 className="form-description">Edit home information</h1>
			<form className="create-room-form" onSubmit={onSubmit}>
				<label htmlFor="name">Name</label>
				<input
					type="text"
					id="name"
					className="form-input"
					placeholder="Name of your home"
					value={name}
					onChange={(e) => {
						setName(e.target.value);
					}}
					required
				></input>
				<label htmlFor="address">Address</label>
				<input
					type="text"
					id="address"
					className="form-input"
					placeholder="Address"
					value={address}
					onChange={(e) => setAddress(e.target.value)}
					required
				></input>
				<label htmlFor="city">City</label>
				<input
					type="text"
					id="city"
					className="form-input"
					placeholder="City"
					value={city}
					onChange={(e) => setCity(e.target.value)}
				></input>
				{country === "United States" && (
					<>
						<label htmlFor="state">State</label>

						<select
							name="state"
							id="state"
							className="form-input"
							value={state}
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

				<label htmlFor="country">Country</label>
				<select
					id="country"
					className="form-input"
					name="country"
					placeholder="Country"
					value={country}
					onChange={(e) => setCountry(e.target.value)}
				>
					<option value="United States">United States</option>
				</select>

				<label htmlFor="latitude">Latitude</label>
				<input
					type="number"
					className="form-input"
					min="-90"
					max="90"
					step="any"
					id="latitude"
					placeholder="Latitude (Between -90 to 90)"
					value={latitude}
					onChange={(e) => setLatitude(e.target.value)}
					required
				></input>
				<label htmlFor="longitude">Longitude</label>
				<input
					type="number"
					className="form-input"
					min="-180"
					max="180"
					step="any"
					id="longitude"
					placeholder="Longitude (Between -180 to 180)"
					value={longitude}
					onChange={(e) => setLongitude(e.target.value)}
					required
				></input>
				<label htmlFor="description">Description</label>
				<textarea
					type="textArea"
					className="form-input"
					id="description"
					value={description}
					onChange={(e) => setDescription(e.target.value)}
					required
				></textarea>
				<label htmlFor="price">Price Per Night ${price}</label>
				<input
					type="range"
					className="form-input"
					min="0"
					max="1000"
					value={price}
					id="price"
					onChange={(e) => setPrice(e.target.value)}
					required
				></input>
				<label htmlFor="previewImage">Add a preview Image</label>
				<input
					type="url"
					className="form-input"
					id="previewImage"
					value={previewImage}
					placeholder="Preview image URL"
					onChange={(e) => setPreviewImage(e.target.value)}
					required
				></input>
				<button className="submit-form-btn">Submit</button>
			</form>
		</div>
	);
};

export default EditRoomForm;
