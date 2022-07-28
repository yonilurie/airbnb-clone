import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";

import { createRoom } from "../../../store/rooms";
import "../CSS/CreateRoom.css";

const CreateRoomForm = () => {
	const history = useHistory();
	const sessionuser = useSelector((state) => state.session.user);
	const dispatch = useDispatch();

	// State
	const [name, setName] = useState("");
	const [address, setAddress] = useState("");
	const [city, setCity] = useState("");
	const [state, setState] = useState("WA");
	const [country, setCountry] = useState("United States");
	const [latitude, setLatitude] = useState();
	const [longitude, setLongitude] = useState();
	const [description, setDescription] = useState("");
	const [price, setPrice] = useState(100);
	const [previewImage, setPreviewImage] = useState("");
	const [validationErrors, setValidationErrors] = useState([]);
	const [isLoaded, setIsLoaded] = useState(false);

	//On initial render set isLoaded to false
	useEffect(() => {
		setIsLoaded(false);
	}, []);

	//Validate user form input and render errors if they are present
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

	//If the user is not logged in, redirect the user to home page
	if (!sessionuser) return <Redirect to="/" />;

	//When for/ is submitted
	const onSubmit = (e) => {
		e.preventDefault();

		const room = {
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
			dispatch(createRoom(JSON.stringify(room)));

			setName("");
			setAddress("");
			setCity("");
			setState("WA");
			setCountry("United States");
			setLatitude(0);
			setLongitude(0);
			setDescription("");
			setPrice(100);

			//Redirect user to home page
			history.push("/my-rooms");
			history.go("/my-rooms");
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
			<h1 className="form-description">Host your home</h1>
			<form className="create-room-form" onSubmit={onSubmit}>
				<label htmlFor="name">Name</label>
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
				<label htmlFor="address">Address</label>
				<input
					type="text"
					className="form-input"
					id="address"
					placeholder="Address"
					value={address}
					onChange={(e) => setAddress(e.target.value)}
					required
				></input>
				<label htmlFor="city">City</label>
				<input
					type="text"
					className="form-input"
					id="city"
					placeholder="City"
					value={city}
					onChange={(e) => setCity(e.target.value)}
				></input>
				<label htmlFor="state">State</label>

				{country === "United States" && (
					<>
						<select
							name="state"
							className="form-input"
							id="state"
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
				<label htmlFor="price">Price per Night ${price}</label>
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
					onChange={(e) => setPreviewImage(e.target.value)}
					required
				></input>
				<button className="submit-form-btn">Submit</button>
			</form>
		</div>
	);
};

export default CreateRoomForm;