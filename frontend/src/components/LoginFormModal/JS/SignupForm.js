import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import * as sessionActions from "../../../store/session";
import "../CSS/LoginForm.css";

function SignupForm({ showModal, setShowModal }) {
	const dispatch = useDispatch();
	//State
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [lastName, setLastName] = useState("");
	const [firstName, setFirstName] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errors, setErrors] = useState([]);

	//On submit if errors are present, setErrors and they will be rendered to user
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

			//if no errors, close the modal
			if (trySignup.user) setShowModal(false);
			return trySignup;
		}

		return setErrors([
			"Confirm Password field must be the same as the Password field",
		]);
	};

	return (
		<div className="modal-body">
			<button
				className="modal-exit-btn"
				onClick={() => setShowModal(false)}
			>
				X
			</button>
			<div className="modal-header">
				<div className="modal-title">Sign Up</div>
			</div>
			<form onSubmit={handleSubmit}>
				<h3 className="modal-welcome">Welcome to Airbnb</h3>
				{errors.length > 0 && (
					<ul className="errors">
						{errors.map((error, idx) => (
							<li key={idx}>{error}</li>
						))}
					</ul>
				)}

				<div>
					<div className="modal-input-label" hidden={!email}>
						Email
					</div>

					<input
						className="modal-input"
						type="text"
						placeholder="Email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
				</div>

				<div>
					<div className="modal-input-label" hidden={!username}>
						Username
					</div>
					<input
						className="modal-input"
						type="text"
						placeholder="Username"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						required
					/>
				</div>

				<div>
					<div className="modal-input-label" hidden={!firstName}>
						First Name
					</div>
					<input
						className="modal-input"
						type="text"
						placeholder="First Name"
						value={firstName}
						onChange={(e) => setFirstName(e.target.value)}
					/>
				</div>

				<div>
					<div className="modal-input-label" hidden={!lastName}>
						Last Name
					</div>
					<input
						className="modal-input"
						type="text"
						placeholder="Last Name"
						value={lastName}
						onChange={(e) => setLastName(e.target.value)}
					/>
				</div>

				<div>
					<div className="modal-input-label" hidden={!password}>
						Password
					</div>
					<input
						className="modal-input"
						type="password"
						placeholder="Password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
				</div>

				<div>
					<div
						className="modal-input-label"
						hidden={!confirmPassword}
					>
						Confirm Password
					</div>
					<input
						className="modal-input"
						type="password"
						placeholder="Confirm Password"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						required
					/>
				</div>

				<button type="submit" className="login-register-submit">
					Sign Up
				</button>
			</form>
		</div>
	);
}

export default SignupForm;
