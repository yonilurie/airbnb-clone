import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import ProfileButton from "./JS/ProfileButton";
import LoginFormModal from "../LoginFormModal";

import logo from "../../images/logo.svg";
import * as sessionActions from "../../store/session";
import "./CSS/Navigation.css";

function Navigation({ isLoaded }) {
	const dispatch = useDispatch();
	const sessionuser = useSelector((state) => state.session.user);

	// const store = useSelector((state) => state);
	// console.log("STORE",store);
	//Determines what will render in the navbar depending on whether user is logged in
	//Passed as prop to Profile button component
	let sessionLinks;
	if (sessionuser) {
		sessionLinks = <ProfileButton user={sessionuser} />;
	} else {
		//if user is not logged in a login and and signup button will be displayed in the profile button
		sessionLinks = (
			<>
				<LoginFormModal />
				<button
					onClick={() =>
						dispatch(
							sessionActions.login({
								credential: "Demo-lition",
								password: "password",
							})
						)
					}
				>
					Demo
				</button>
			</>
		);
	}
	return (
		<div className="nav-container">
			<div className="nav-items">
				<div>
					<NavLink exact to="/" className="nav-link">
						<img src={logo} alt="logo" id="logo"></img>
					</NavLink>
				</div>

				<div>
					{isLoaded && sessionLinks && (
						<ProfileButton
							className="session-links"
							user={sessionuser}
							sessionLinks={sessionLinks}
						></ProfileButton>
					)}
				</div>
			</div>
		</div>
	);
}

export default Navigation;
