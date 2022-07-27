import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import ProfileButton from "./ProfileButton";
import LoginFormModal from "../LoginFormModal";

import logo from "../../images/logo.svg";
import * as sessionActions from "../../store/session";
import "./Navigation.css";

function Navigation({ isLoaded }) {
	const dispatch = useDispatch();
	const sessionuser = useSelector((state) => state.session.user);

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
			<ul>
				<li>
					<NavLink exact to="/" className="nav-link">
						<img src={logo} alt="logo" id="logo"></img>
					</NavLink>
				</li>

				<li>
					{isLoaded && sessionLinks && (
						<ProfileButton
							className="session-links"
							user={sessionuser}
							sessionLinks={sessionLinks}
						></ProfileButton>
					)}
				</li>
			</ul>
		</div>
	);
}

export default Navigation;
