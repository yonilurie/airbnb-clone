import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";

import SingleRoomInfo from "./components/Rooms/SingleRoomInfo";
import Navigation from "./components/Navigation";
import Rooms from "./components/Rooms";
import CreateRoomForm from "./components/Rooms/CreateRoomForm";
import EditRoomForm from "./components/Rooms/EditRoomForm";
import MyRooms from "./components/Rooms/MyRooms";
import Bookings from "./components/Bookings";
import CreateReview from "./components/Review";
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

					<Route path="/host-your-home">
						<CreateRoomForm></CreateRoomForm>
					</Route>
					<Route path="/my-rooms">
						<MyRooms></MyRooms>
					</Route>
					<Route exact path="/rooms/:roomId">
						<SingleRoomInfo></SingleRoomInfo>
					</Route>
					<Route path="/rooms/:roomId/edit">
						<EditRoomForm></EditRoomForm>
					</Route>
					<Route path="/trips">
						<Bookings></Bookings>
					</Route>
					<Route path="/add-review/:roomId">
						<CreateReview></CreateReview>
					</Route>
					<Route>
						<div>404: PAGE NOT FOUND</div>
					</Route>
				</Switch>
			)}
		</>
	);
}

export default App;
