import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import "./CSS/Navigation.css";
import ProfileButton from "./JS/ProfileButton";
const logo = require("../../images/logo.png");

type NavigationProps = {
	isLoaded: boolean;
};

interface State {
	session: {
		user: {
			firstName: string;
			lastName: string;
			email: string;
		};
	};
}

function Navigation({ isLoaded }: NavigationProps) {
	const sessionuser = useSelector((state: State) => state.session.user);
	return (
		<div className="nav-container">
			<div className="nav-items">
				<div>
					<NavLink exact to="/" className="nav-link">
						<img src={logo} alt="logo" id="logo"></img>
					</NavLink>
				</div>
				<div>{isLoaded && <ProfileButton user={sessionuser} />}</div>
			</div>
		</div>
	);
}

export default Navigation;
