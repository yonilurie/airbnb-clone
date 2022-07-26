import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";

import SingleRoomInfo from "./components/Rooms/SingleRoomInfo";
import Navigation from "./components/Navigation";
import Rooms from "./components/Rooms";
import CreateRoomForm from "./components/Rooms/CreateRoomForm";
import MyRooms from "./components/Rooms/MyRooms";
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
					<Route exact path="/">
						<Rooms></Rooms>
					</Route>
					<Route path="/rooms/:roomId">
						<SingleRoomInfo></SingleRoomInfo>
					</Route>
					<Route path="/api/become-a-host">
						<CreateRoomForm></CreateRoomForm>
					</Route>
					<Route path="/api/rooms">
						<MyRooms></MyRooms>
					</Route>
				</Switch>
			)}
		</>
	);
}

export default App;
