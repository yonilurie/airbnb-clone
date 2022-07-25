import { useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import LoginFormModal from "../LoginFormModal";
import * as sessionActions from "../../store/session";

const SessionLinks = ({ showModal, setShowModal }) => {
	const dispatch = useDispatch();
	return (
		<>
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
};

export default SessionLinks;
