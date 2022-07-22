import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import logo from "../../images/logo.svg";

function Navigation({ isLoaded }) {
	const sessionuser = useSelector((state) => state.session.user);

	let sessionLinks;
	if (sessionuser) {
		sessionLinks = <ProfileButton user={sessionuser} />;
	} else {
		sessionLinks = (
			<>
				<NavLink to="/login" className="nav-link">
					Log In
				</NavLink>
				<NavLink to="/signup" className="nav-link">
					Sign Up
				</NavLink>
			</>
		);
	}
	return (
		<ul>
			<li>
				<NavLink exact to="/" className="nav-link">
					<img src={logo} alt="logo"></img>
				</NavLink>
			</li>
			<li>{isLoaded && sessionLinks}</li>
		</ul>
	);
}

export default Navigation;
