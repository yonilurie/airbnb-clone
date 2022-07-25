import React, { useState, useEffect, useContext } from "react";
import { useDispatch } from "react-redux";

import * as sessionActions from "../../store/session";
import "./ProfileButton.css";

function ProfileButton({ user, sessionLinks }) {
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
					<li hidden={!user}>{user && user.username}</li>
					<li hidden={!user}>{user && user.email}</li>
					<li hidden={!user}>
						{user && <button onClick={logout}>Log Out</button>}
					</li>
					{!user && sessionLinks}
				</ul>
			)}
		</>
	);
}

export default ProfileButton;
