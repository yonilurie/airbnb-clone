import { useState } from "react";

const CreateRoomForm = () => {
	const [name, setName] = useState();
	const [address, setAddress] = useState();
	const [city, setCity] = useState();
	const [state, setState] = useState();
	const [country, setCountry] = useState();
	const [latitude, setLatitude] = useState();
	const [longitude, setLongitude] = useState();
	const [description, setDescription] = useState();
	const [price, setPrice] = useState();
	const [validationErrors, setValidationErrors] = useState()

	const onSubmit = (e) => {
		e.preventDefault();
		const errors = []

		setValidationErrors(errors)
	};

	return (
		<form className="create-room-form" onSubmit={onSubmit}>
			<label for="name">Name</label>
			<input
				type="text"
				id="name"
				onChange={(e) => setName.target.value}
			></input>
			<label for="address">Address</label>
			<input
				type="text"
				id="address"
				onChange={(e) => setName.target.value}
			></input>
			<label for="city">City</label>
			<input
				type="text"
				id="city"
				onChange={(e) => setName.target.value}
			></input>
			<label for="state">State</label>
			<input
				type="text"
				id="address"
				onChange={(e) => setName.target.value}
			></input>
			<label for="country">Country</label>
			<input
				type="text"
				id="country"
				onChange={(e) => setName.target.value}
			></input>
			<label for="latitude">Latitude</label>
			<input
				type="text"
				id="latitude"
				onChange={(e) => setName.target.value}
			></input>
			<label for="longitude">Longitude</label>
			<input
				type="text"
				id="longitude"
				onChange={(e) => setName.target.value}
			></input>
			<label for="description">Description</label>
			<input
				type="text"
				id="description"
				onChange={(e) => setName.target.value}
			></input>
			<label for="price">Price</label>
			<input
				type="text"
				id="price"
				onChange={(e) => setName.target.value}
			></input>
			<button>Submit</button>
		</form>
	);
};

export default CreateRoomForm;
