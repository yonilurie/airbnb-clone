import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import LoginFormModal from "./components/LoginFormModal";
import SignupFormPage from "./components/SignupFormPage";
import SingleRoomInfo from "./components/Rooms/SingleRoomInfo";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import Rooms from "./components/Rooms";
function App() {
	const dispatch = useDispatch();
	const [isLoaded, setIsLoaded] = useState(false);
	useEffect(() => {
		dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
	}, [dispatch]);

	return (
		<>
			<Navigation isLoaded={isLoaded} />
			{isLoaded && (
				<Switch>
				
					<Route path="/signup">
						<SignupFormPage />
					</Route>
					<Route path="/:roomId">
						<SingleRoomInfo></SingleRoomInfo>
					</Route>
				</Switch>
			)}
			<Rooms></Rooms>
		</>
	);
}

export default App;
