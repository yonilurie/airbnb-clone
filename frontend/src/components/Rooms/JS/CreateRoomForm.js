import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { createRoom } from "../../../store/session";
import "../CSS/RoomForm.css";

const CreateRoomForm = () => {
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
	const [images, setImages] = useState([]);
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

		// setValidationErrors(errors);
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

	const updateFile = (e) => {
		const file = e.target.files[0];
		if (!file) return;

		let testImage = new Image();
		// If file size is too large show an error
		testImage.onload = function () {
			if (file.size > 5000000) {
				return setImageErrors(["File size must be less than 5 MB"]);
			}
			setImageErrors([]);
			setImages([...images, file]);
		};
		// If image does not load show an error
		testImage.onerror = function () {
			return setImageErrors(["Invalid Image, please try another one"]);
		};
		//Create image to run previous tests
		testImage.src = URL.createObjectURL(file);
	};

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
			if (checkIfLocationTakenData.rooms.length > 0) {
				setValidationErrors(["This location is already taken"]);
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
					validationErrors.map((error) => {
						return (
							<div key={error} className="error">
								{error}
							</div>
						);
					})}
				{imageErrors.length > 0 &&
					imageErrors.map((error) => {
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
							Images - First image will be preview
						</label>
						{images.length !== 5 && (
							<label
								htmlFor="images"
								className="image-input-select"
							>
								Choose Images
							</label>
						)}
						<div className="create-room-gallery">
							{images &&
								Array.from(images).map((img, idx) => {
									return (
										<div
											id={idx}
											className="gallery-image-container"
										>
											<div
												className="delete-gallery-image"
												onClick={() => {
													let newArr = Array.from(
														images
													);
													newArr.splice(idx, 1);

													setImages(newArr);
												}}
											>
												X
											</div>
											<a
												href={URL.createObjectURL(img)}
												target="_blank"
												rel="noreferrer"
											>
												<img
													className="create-room-image"
													src={URL.createObjectURL(
														img
													)}
													alt="preview"
												></img>
											</a>
										</div>
									);
								})}
						</div>
						<input
							type="file"
							id="images"
							accept="image/png, image/jpg, image/jpeg"
							onChange={updateFile}
						></input>
					</div>
				</div>
				<button className="submit-form-btn">Submit</button>
			</form>
		</div>
	);
};

export default CreateRoomForm;
