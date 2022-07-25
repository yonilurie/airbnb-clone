import { useState } from "react";

const CreateRoomForm = () => {
	return (
		<form className="create-room-form">
			<label for="name">Name</label>
			<input type="text" id="name"></input>
			<label for="address">Address</label>
			<input type="text" id="address"></input>
			<label for="name">City</label>
			<input type="text" id="name"></input>
			<label for="name">State</label>
			<input type="text" id="name"></input>
			<label for="name">Country</label>
			<input type="text" id="name"></input>
			<label for="name">Latitude</label>
			<input type="text" id="name"></input>
			<label for="name">Longitude</label>
			<input type="text" id="name"></input>
			<label for="name">Description</label>
			<input type="text" id="name"></input>
			<label for="name">Price</label>
			<input type="text" id="name"></input>
			<button>Submit</button>
		</form>
	);
};

export default CreateRoomForm;
