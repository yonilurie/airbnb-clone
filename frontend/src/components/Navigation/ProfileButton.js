import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";
import "./ProfileButton.css";

function ProfileButton({ user }) {
	const dispatch = useDispatch();
	const [showMenu, setShowMenu] = useState(false);

	const openMenu = () => {
		if (showMenu) return;
		setShowMenu(true);
	};

	useEffect(() => {
		if (!showMenu) return;

		const closeMenu = () => {
			setShowMenu(false);
		};

		document.addEventListener("click", closeMenu);

		return () => document.removeEventListener("click", closeMenu);
	}, [showMenu]);

	const logout = (e) => {
		e.preventDefault();
		dispatch(sessionActions.logout());
	};

	return (
		<>
			<button onClick={openMenu}>
				<i className="fas fa-user-circle" />
				<svg
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
					<g fill="none" fill-rule="nonzero">
						<path d="m2 16h28"></path>
						<path d="m2 24h28"></path>
						<path d="m2 8h28"></path>
					</g>
				</svg>
			</button>

			{showMenu && (
				<ul className="profile-dropdown">
					<li>{user.username}</li>
					<li>{user.email}</li>
					<li>
						<button onClick={logout}>Log Out</button>
					</li>
				</ul>
			)}
		</>
	);
}

export default ProfileButton;
