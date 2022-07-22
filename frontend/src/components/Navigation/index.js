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
				<NavLink
					to="/signup"
					className="nav-link"
					style={{ fontWeight: "bold" }}
				>
					Sign Up
				</NavLink>
				<NavLink to="/login" className="nav-link">
					Log In
				</NavLink>
			</>
		);
	}
	return (
		<div className="nav-container">
			<ul>
				<li>
					<NavLink exact to="/" className="nav-link">
						<img src={logo} alt="logo"></img>
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
