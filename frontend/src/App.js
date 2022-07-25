import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";

import SignupFormPage from "./components/SignupFormPage";
import SingleRoomInfo from "./components/Rooms/SingleRoomInfo";
import Navigation from "./components/Navigation";
import Rooms from "./components/Rooms";

import * as sessionActions from "./store/session";

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
					<Route exact path="/">
						<Rooms></Rooms>
					</Route>
					<Route path="/rooms/:roomId">
						<SingleRoomInfo></SingleRoomInfo>
					</Route>
				</Switch>
			)}
		</>
	);
}

export default App;
