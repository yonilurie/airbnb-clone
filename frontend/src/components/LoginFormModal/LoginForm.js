import React, { useState } from "react";
import { useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";

import "./LoginForm.css";

function LoginForm({ setShowModal }) {
	const dispatch = useDispatch();

	//State
	const [credential, setCredential] = useState("");
	const [password, setPassword] = useState("");
	const [errors, setErrors] = useState([]);

	//On submit if errors are present, setErrors and they will be rendered to user
	const handleSubmit = async (e) => {
		e.preventDefault();
		setErrors([]);

		const tryLogin = await dispatch(
			sessionActions.login({ credential, password })
		).then((data) => {
			if (data && data.errors) setErrors(data.errors);
			return data;
		});
		//If no errors are present close the modal
		if (tryLogin.user) setShowModal(false);
		return tryLogin;
	};

	return (
		<form onSubmit={handleSubmit}>
			<div className="modal-welcome">Welcome to Airbnb</div>
			<ul className="errors">
				{errors.map((error, idx) => (
					<li key={idx}>{error}</li>
				))}
			</ul>
			<label>
				Username or Email
				<input
					type="text"
					value={credential}
					onChange={(e) => setCredential(e.target.value)}
					required
				/>
			</label>
			<label>
				Password
				<input
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					required
				/>
			</label>
			<button type="submit" className="login-register-submit">
				Continue
			</button>
		</form>
	);
}

export default LoginForm;
