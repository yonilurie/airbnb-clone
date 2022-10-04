import { Modal } from "../../context/Modal";
import LoginForm from "./JS/LoginForm";
import SignupForm from "./JS/SignupForm";

function LoginFormModal({ showModal, setShowModal, interaction }) {
	return (
		<>
			{showModal && (
				<Modal onClose={() => setShowModal(false)}>
					{interaction === "login" && (
						<LoginForm
							setShowModal={setShowModal}
							showModal={showModal}
						/>
					)}
					{interaction === "signup" && (
						<SignupForm
							setShowModal={setShowModal}
							showModal={showModal}
						/>
					)}
				</Modal>
			)}
		</>
	);
}

export default LoginFormModal;
