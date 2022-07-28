import React from "react";
import { Modal } from "../../context/Modal";
import LoginForm from "./JS/LoginForm";
import SignupForm from "./JS/SignupForm";

function LoginFormModal({ showModal, setShowModal, interaction }) {
	return (
		<>
			{showModal && (
				<Modal onClose={() => setShowModal(false)}>
					{interaction === "login" && (
						<LoginForm setShowModal={setShowModal} />
					)}
					{interaction === "signup" && (
						<SignupForm setShowModal={setShowModal} />
					)}
				</Modal>
			)}
		</>
	);
}

export default LoginFormModal;
