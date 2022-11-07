import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./CSS/Navigation.css";
const logo = require("../../images/logo.png");

const ProfileButton = require("./JS/ProfileButton");
const LoginFormModal = require("../LoginFormModal");

const sessionActions = require("../../store/session");

type Props = {
	isLoaded: boolean;
};

interface State {
	sessionuser: Object;
}

function Navigation({ isLoaded }: Props) {
	const dispatch = useDispatch();
	const sessionuser: State = useSelector((state) => state.session.user);

	//Determines what will render in the navbar depending on whether user is logged in
	//Passed as prop to Profile button component
	let sessionLinks;
	if (sessionuser) {
		sessionLinks = <ProfileButton user={sessionuser} />;
	} else {
		//if user is not logged in a login and and signup button will be displayed in the profile button
		sessionLinks = (
			<>
				<LoginFormModal />
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
	}
	return (
		<div className="nav-container">
			<div className="nav-items">
				<div>
					<NavLink exact to="/" className="nav-link">
						<img src={logo} alt="logo" id="logo"></img>
					</NavLink>
				</div>
				<div>
					{isLoaded && sessionLinks && (
						<ProfileButton
							className="session-links"
							user={sessionuser}
							sessionLinks={sessionLinks}
						></ProfileButton>
					)}
				</div>
			</div>
		</div>
	);
}

export default Navigation;
