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

	let sessionLinks;
	if (sessionuser) {
		sessionLinks = <ProfileButton user={sessionuser} />;
	} else {
		sessionLinks = (
			<>
				<LoginFormModal />
				<NavLink
					to="/signup"
					className="nav-link"
					style={{ fontWeight: "bold" }}
				>
					Sign Up
				</NavLink>
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
					{sessionuser && <NavLink to="/api/become-a-host">Become a Host</NavLink>}
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
