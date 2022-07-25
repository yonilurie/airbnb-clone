import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
function LoginFormModal({ showModal, setShowModal, interaction }) {
	return (
		<>
			{showModal && (
				<Modal onClose={() => setShowModal(false)} >
					{interaction === "login" && <LoginForm setShowModal={setShowModal} />}
					{interaction === "signup" && <SignupForm setShowModal={setShowModal} />}
				</Modal>
			)}
		</>
	);
}

export default LoginFormModal;
