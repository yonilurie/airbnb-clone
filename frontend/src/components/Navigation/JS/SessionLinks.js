import { useDispatch } from "react-redux";

import * as sessionActions from "../../../store/session";

const SessionLinks = () => {
	const dispatch = useDispatch();
	return (
		<>
			<div
				className="profile-button-options"
				style={{ fontWeight: "600" }}
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
