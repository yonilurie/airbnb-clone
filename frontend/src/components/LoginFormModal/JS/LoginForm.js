import { useState } from "react";
import { useDispatch } from "react-redux";

import * as sessionActions from "../../../store/session";
import Errors from "../../Errors";

import "../CSS/Login-SignupForm.css";

function LoginForm({ setShowModal, setInteraction }) {
	const dispatch = useDispatch();

	const [credential, setCredential] = useState("");
	const [password, setPassword] = useState("");
	const [validationErrors, setValidationErrors] = useState([]);

	//On submit if errors are present, setErrors and they will be rendered to user
	const handleSubmit = async (e) => {
		e.preventDefault();
		const tryLogin = await dispatch(
			sessionActions.login({ credential, password })
		).then((data) => {
			if (data && data.errors) setValidationErrors(data.errors);
			return data;
		});
		//If no errors are present close the modal
		if (tryLogin.user) setShowModal(false);
		return tryLogin;
	};

	return (
		<div className="modal-body login">
			<button
				className="modal-exit-btn"
				onClick={() => setShowModal(false)}
			>
				X
			</button>
			<div className="modal-header">
				<div className="modal-title">Log in</div>
			</div>
			<form onSubmit={handleSubmit} className="login-form">
				<h3 className="modal-welcome">Welcome to Airbnb</h3>
				{validationErrors.length > 0 && (
					<ul className="errors">
						{validationErrors.map((error, idx) => (
							<Errors error={error}></Errors>
						))}
					</ul>
				)}
				<div className="input-container">
					<div className="modal-input-label" hidden={!credential}>
						Email or Username
					</div>
					<input
						className="modal-input"
						type="text"
						placeholder="Email or Username"
						value={credential}
						onChange={(e) => setCredential(e.target.value)}
						required
					/>
				</div>
				<div className="input-container">
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
				<button type="submit" className="login-register-submit">
					Log in
				</button>
			</form>
			<button
				className="demo"
				onClick={() =>
					dispatch(
						sessionActions.login({
							credential: "Demo-lition",
							password: "password",
						})
					).then(() => setShowModal(false))
				}
			>
				Demo
			</button>
			<div
				onClick={() => setInteraction("signup")}
				className="auth-toggle"
			>
				Create an account
			</div>
		</div>
	);
}

export default LoginForm;
