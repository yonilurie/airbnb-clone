import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";

import LoginFormModal from "../../LoginFormModal";
import SessionLinks from "./SessionLinks";

import * as sessionActions from "../../../store/session";
import "../CSS/ProfileButton.css";

function ProfileButton({ user }) {
	const dispatch = useDispatch();
	// const sessionuser = useSelector((state) => state.session.user);
	//State
	const [showMenu, setShowMenu] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const [interaction, setInteraction] = useState();

	//Toggles for showing menu
	const openMenu = () => {
		if (showMenu) return;
		setShowMenu(true);
	};

	useEffect(() => {
		if (!showMenu) return;
		const closeMenu = () => setShowMenu(false);
		document.addEventListener("click", closeMenu);
		return () => document.removeEventListener("click", closeMenu);
	}, [showMenu]);

	//Logout functionality
	const logout = (e) => {
		e.preventDefault();
		dispatch(sessionActions.logout());
	};

	useEffect(() => {
		if (showModal) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "unset";
		}
	}, [showModal]);

	return (
		<>
			<LoginFormModal
				showModal={showModal}
				setShowModal={setShowModal}
				interaction={interaction}
			/>
			<button onClick={openMenu} className="profile-button">
				<i className="fas fa-user-circle" />
				<svg
					className="filter-grey"
					viewBox="0 0 32 32"
					xmlns="http://www.w3.org/2000/svg"
					aria-hidden="true"
					role="presentation"
					focusable="false"
					style={{
						display: "block",
						fill: "none",
						height: "16px",
						width: "16px",
						stroke: "currentcolor",
						strokeWidth: "3",
						overflow: "visible",
					}}
				>
					<g fill="none" fillRule="nonzero">
						<path d="m2 16h28"></path>
						<path d="m2 24h28"></path>
						<path d="m2 8h28"></path>
					</g>
				</svg>
				<svg
					className="filter-grey"
					viewBox="0 0 32 32"
					xmlns="http://www.w3.org/2000/svg"
					aria-hidden="true"
					role="presentation"
					focusable="false"
					style={{
						display: "block",
						height: "30px",
						width: "30px",
						fill: "currentcolor",
					}}
				>
					<path d="m16 .7c-8.437 0-15.3 6.863-15.3 15.3s6.863 15.3 15.3 15.3 15.3-6.863 15.3-15.3-6.863-15.3-15.3-15.3zm0 28c-4.021 0-7.605-1.884-9.933-4.81a12.425 12.425 0 0 1 6.451-4.4 6.507 6.507 0 0 1 -3.018-5.49c0-3.584 2.916-6.5 6.5-6.5s6.5 2.916 6.5 6.5a6.513 6.513 0 0 1 -3.019 5.491 12.42 12.42 0 0 1 6.452 4.4c-2.328 2.925-5.912 4.809-9.933 4.809z"></path>
				</svg>
			</button>

			{showMenu && (
				<ul className="profile-dropdown">
					{!user && (
						<>
							<div
								style={{ fontWeight: "600" }}
								className="profile-button-options"
								onClick={() => {
									setShowModal(true);
									setInteraction("login");
								}}
							>
								Log in
							</div>
							<SessionLinks
								showModal={showModal}
								setShowModal={setShowModal}
							/>
							<div
								className="profile-button-options signup"
								onClick={() => {
									setShowModal(true);
									setInteraction("signup");
								}}
							>
								Sign Up
							</div>
						</>
					)}

					{user && (
						<>
							<div
								className="profile-button-info name"
								hidden={!user}
							>
								User: {user.firstName + " " + user.lastName}
							</div>
							<div
								className="profile-button-info email"
								hidden={!user}
							>
								E-mail: {user.email}
							</div>
							<NavLink
								to="/trips"
								className="profile-button-info  profile-button-options trips"
							>
								Trips
							</NavLink>

							<NavLink
								to="/host-your-home"
								className="profile-button-options"
							>
								Host your Home
							</NavLink>

							<NavLink
								to="/my-rooms"
								className="profile-button-options"
							>
								My Rooms
							</NavLink>

							<div
								className="profile-button-options logout"
								onClick={logout}
							>
								<div>Log Out</div>
							</div>
						</>
					)}
				</ul>
			)}
		</>
	);
}

export default ProfileButton;
