import React, { useState } from "react";

import { Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as sessionActions from "../../store/session";
import "./LoginForm.css";

function SignupForm({ setShowModal }) {
	const dispatch = useDispatch();
	const sessionUser = useSelector((state) => state.session.user);
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [lastName, setLastName] = useState("");
	const [firstName, setFirstName] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errors, setErrors] = useState([]);

	if (sessionUser) return <Redirect to="/" />;

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (password === confirmPassword) {
			setErrors([]);
			const trySignup = await dispatch(
				sessionActions.signup({
					email,
					password,
					username,
					firstName,
					lastName,
				})
			).then((data) => {
				if (data && data.errors) return setErrors(data.errors);
				return data;
			});

			if (trySignup.user) setShowModal(false);
			return trySignup;
		}

		return setErrors([
			"Confirm Password field must be the same as the Password field",
		]);
	};

	return (
		<form onSubmit={handleSubmit}>
			<div>Sign Up</div>
			<ul className="errors">
				{errors.map((error, idx) => (
					<li key={idx}>{error}</li>
				))}
			</ul>
			<label>
				Email
				<input
					type="text"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					required
				/>
			</label>
			<label>
				Username
				<input
					type="text"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					required
				/>
			</label>
			<label>
				First Name
				<input
					type="text"
					value={firstName}
					onChange={(e) => setFirstName(e.target.value)}
				/>
			</label>
			<label>
				Last Name
				<input
					type="text"
					value={lastName}
					onChange={(e) => setLastName(e.target.value)}
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
			<label>
				Confirm Password
				<input
					type="password"
					value={confirmPassword}
					onChange={(e) => setConfirmPassword(e.target.value)}
					required
				/>
			</label>
			<button type="submit">Sign Up</button>
		</form>
	);
}

export default SignupForm;
