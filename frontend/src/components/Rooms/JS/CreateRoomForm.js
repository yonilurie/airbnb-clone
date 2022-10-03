import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";

import { createRoom } from "../../../store/session";
import "../CSS/RoomForm.css";

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
	const [latitude, setLatitude] = useState(22);
	const [longitude, setLongitude] = useState(2);
	const [description, setDescription] = useState("");
	const [price, setPrice] = useState(100);
	const [images, setImages] = useState(null);
	const [validationErrors, setValidationErrors] = useState([]);
	const [isLoaded, setIsLoaded] = useState(false);

	//On initial render set isLoaded to false
	useEffect(() => {
		setIsLoaded(false);
	}, []);

	useEffect(() => {
		if (document.title !== "Host your Home")
			document.title = "Host your Home";
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
		images,
	]);

	//If the user is not logged in, redirect the user to home page
	if (!sessionuser) return <Redirect to="/" />;

	const updateFile = (e) => {
		const files = e.target.files;
		if (files) setImages(files);
	};

	//When for/ is submitted
	const onSubmit = async (e) => {
		e.preventDefault();

		if (!validationErrors.length) {
			const checkIfLocationTaken = await fetch(
				`/api/rooms/search?minLat=${latitude}&maxLat=${latitude}&minLng=${longitude}&maxLng=${longitude}`
			);
			const checkIfLocationTakenData = await checkIfLocationTaken.json();
			if (checkIfLocationTakenData.rooms.length > 0) {
				setValidationErrors(["This location is already taken"]);
				setIsLoaded(true);
				document.body.scrollTop = 0;
				document.documentElement.scrollTop = 0;
				return;
			}

			dispatch(
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
				})
			);

			// setName("");
			// setAddress("");
			// setCity("");
			// setState("WA");
			// setCountry("United States");
			// setLatitude(0);
			// setLongitude(0);
			// setDescription("");
			// setPrice(100);

			//Redirect user to home page
			// history.push("/my-rooms");
		} else {
			document.body.scrollTop = 0;
			document.documentElement.scrollTop = 0;
			setIsLoaded(true);
		}
	};
	return (
		<div className="form-container">
			<h1 className="form-description">Host your home</h1>
			<div className="errors">
				{isLoaded &&
					validationErrors.length > 0 &&
					validationErrors.map((error) => {
						return (
							<div key={error} className="error">
								{error}
							</div>
						);
					})}
			</div>

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
					<div className="input-container state-country">
						<div className="country-container">
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

						<div className="country-container">
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
					</div>

					<div className="input-container state-country">
						{" "}
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
								<option value="United States">
									United States
								</option>
							</select>
						</div>
						<div className="state-container">
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
										onChange={(e) =>
											setState(e.target.value)
										}
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
										<option value="MA">
											Massachusetts
										</option>
										<option value="MI">Michigan</option>
										<option value="MN">Minnesota</option>
										<option value="MS">Mississippi</option>
										<option value="MO">Missouri</option>
										<option value="MT">Montana</option>
										<option value="NE">Nebraska</option>
										<option value="NV">Nevada</option>
										<option value="NH">
											New Hampshire
										</option>
										<option value="NJ">New Jersey</option>
										<option value="NM">New Mexico</option>
										<option value="NY">New York</option>
										<option value="NC">
											North Carolina
										</option>
										<option value="ND">North Dakota</option>
										<option value="OH">Ohio</option>
										<option value="OK">Oklahoma</option>
										<option value="OR">Oregon</option>
										<option value="PA">Pennsylvania</option>
										<option value="RI">Rhode Island</option>
										<option value="SC">
											South Carolina
										</option>
										<option value="SD">South Dakota</option>
										<option value="TN">Tennessee</option>
										<option value="TX">Texas</option>
										<option value="UT">Utah</option>
										<option value="VT">Vermont</option>
										<option value="VA">Virginia</option>
										<option value="WA">Washington</option>
										<option value="WV">
											West Virginia
										</option>
										<option value="WI">Wisconsin</option>
										<option value="WY">Wyoming</option>
									</select>
								</>
							)}
						</div>
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

					<div className="input-container">
						<label htmlFor="images" className="form-label">
							Images - Select five - First image will be preview
						</label>

						<label htmlFor="images" className="image-input-select">
							Choose Images
						</label>

						<div className="create-room-gallery">
							{images &&
								[0, 1, 2, 3, 4].map((num) => {
									if (images[num]) {
										return (
											<a
												href={URL.createObjectURL(
													images[num]
												)}
												target="_blank"
												rel="noreferrer"
											>
												<img
													className="create-room-image"
													src={URL.createObjectURL(
														images[num]
													)}
													alt="preview"
												></img>
											</a>
										);
									}
								})}
						</div>
						<input
							type="file"
							id="images"
							onChange={updateFile}
							multiple
						></input>
					</div>
				</div>
				<button className="submit-form-btn">Submit</button>
			</form>
		</div>
	);
};

export default CreateRoomForm;
