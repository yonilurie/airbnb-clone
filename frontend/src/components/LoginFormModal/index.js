import { Modal } from "../../context/Modal";
import LoginForm from "./JS/LoginForm";
import SignupForm from "./JS/SignupForm";

function LoginFormModal({
	showModal,
	setShowModal,
	interaction,
	setInteraction,
}) {
	return (
		<>
			{showModal && (
				<Modal onClose={() => setShowModal(false)}>
					{interaction === "login" && (
						<LoginForm
							setShowModal={setShowModal}
							showModal={showModal}
							setInteraction={setInteraction}
						/>
					)}
					{interaction === "signup" && (
						<SignupForm
							setShowModal={setShowModal}
							showModal={showModal}
							setInteraction={setInteraction}
						/>
					)}
				</Modal>
			)}
		</>
	);
}

export default LoginFormModal;
