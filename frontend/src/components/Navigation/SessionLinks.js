import { useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import LoginFormModal from "../LoginFormModal";
import * as sessionActions from "../../store/session";

const SessionLinks = ({ showModal, setShowModal }) => {
	const dispatch = useDispatch();
	return (
		<>
			<div
				className="profile-button-options"
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
			</div>
		</>
	);
};

export default SessionLinks;
