import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";

import SingleRoomInfo from "./components/RoomPage";
import Navigation from "./components/Navigation";
import HomePage from "./components/HomePage";
import CreateRoomForm from "./components/CreateRoom/JS/CreateRoomForm";
import EditRoomForm from "./components/CreateRoom/JS/EditRoomForm";
import MyRooms from "./components/MyRooms";
import Bookings from "./components/Bookings";
import BookingPage from "./components/BookingPage";
import ProtectedRoute from "./ProtectedRoute";
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
						<HomePage></HomePage>
					</Route>
					<ProtectedRoute exact path="/host-your-home">
						<CreateRoomForm></CreateRoomForm>
					</ProtectedRoute>
					<ProtectedRoute exact path="/my-rooms">
						<MyRooms></MyRooms>
					</ProtectedRoute>
					<Route exact path="/rooms/:roomId">
						<SingleRoomInfo></SingleRoomInfo>
					</Route>
					<ProtectedRoute exact path="/rooms/:roomId/edit">
						<EditRoomForm></EditRoomForm>
					</ProtectedRoute>
					<ProtectedRoute exact path="/trips">
						<Bookings></Bookings>
					</ProtectedRoute>
					<ProtectedRoute exact path="/trips/:bookingId">
						<BookingPage></BookingPage>
					</ProtectedRoute>
					<Route>
						<HomePage></HomePage>
					</Route>
				</Switch>
			)}
		</>
	);
}

export default App;
