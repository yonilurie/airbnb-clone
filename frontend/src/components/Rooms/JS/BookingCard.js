import "../CSS/BookingCard.css";
import "react-calendar/dist/Calendar.css";
// import "react-date-range/dist/styles.css"; // main css file
// import "react-date-range/dist/theme/default.css"; // theme css file

import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import { createBooking, getAUsersBookings } from "../../../store/session";

import CalendarMenu from "./CalendarMenu";

const BookingCard = ({ currentRoom, setShowModal }) => {
	const dispatch = useDispatch();
	const history = useHistory();

	//Create start and end dates for default values in input field
	let startDate = new Date();
	let endDate = new Date();
	const cleaningFeeCost = 22;
	const serviceFeeCost = 35;
	const maxGuests = 4;
	const maxGuestsArr = [];
	const nights = 5;
	endDate.setDate(Number(endDate.getDate()) + nights);

	for (let i = 1; i <= maxGuests; i++) {
		maxGuestsArr.push(i);
	}

	function getPreviousDay(date = new Date()) {
		const previous = new Date(date.getTime());
		previous.setDate(date.getDate() - 1);
		return previous;
	}

	const [bookingStartDate, setBookingStartDate] = useState(startDate);
	const [bookingEndDate, setBookingEndDate] = useState(endDate);
	const [bookingDuration, setBookingDuration] = useState(nights);
	const [guests, setGuests] = useState(1);
	const [nightlyTotal, setNightlyTotal] = useState(
		currentRoom.price * nights
	);
	const [cleaningFee, setCleaningFee] = useState(nights * cleaningFeeCost);
	const [serviceFee, setServiceFee] = useState(nights * serviceFeeCost);
	const [bookingTotal, setBookingTotal] = useState(
		nightlyTotal + cleaningFee + serviceFee
	);
	const [bookedDates, setBookedDates] = useState([]);
	const [validationErrors, setValidationErrors] = useState([]);
	const [showMenu, setShowMenu] = useState(false);

	//Handle creating a booking
	const handleSubmit = async (e) => {
		e.preventDefault();
		const data = await dispatch(
			createBooking({
				startDate: bookingStartDate,
				endDate: bookingEndDate,
				roomId: currentRoom.id,
				guests: guests,
			})
		);
		if (data.errors) {
			setValidationErrors([data.errors.error]);
		} else {
			setValidationErrors(["Successfully booked!"]);
			dispatch(getAUsersBookings()).then(() => {
				history.push(`/trips/${data.id}`);
			});
		}
	};

	const checkInvalidTile = ({ activeStartDate, date, view }) => {
		for (let booking of bookedDates) {
			let currStart = new Date(booking.start).getTime();
			let currEnd = new Date(booking.end).getTime();
			let currTime = date.getTime();
			if (currTime <= currEnd && currTime >= currStart) return true;
		}
		return false;
	};

	const calendarOnChange = (e) => {
		if (
			e[0].toLocaleString().slice(0, 10) ===
			e[1].toLocaleString().slice(0, 10)
		) {
			return setValidationErrors(["Must book at least one night"]);
		}
		setBookingStartDate(e[0]);
		setBookingEndDate(e[1]);
		console.log(e[1].toISOString());
		console.log(e[1].toLocaleString());
	};

	useEffect(() => {
		let difference = bookingEndDate.getTime() - bookingStartDate.getTime();
		if (difference !== endDate.getTime() - startDate.getTime()) {
			let duration = Math.ceil(difference / (1000 * 3600 * 24) - 1);
			setBookingDuration(duration);
		}
	}, [bookingStartDate, bookingEndDate]);

	useEffect(() => {
		setCleaningFee(bookingDuration * cleaningFeeCost);
		setServiceFee(bookingDuration * serviceFeeCost);
		setNightlyTotal(bookingDuration * currentRoom.price);
	}, [bookingDuration]);

	useEffect(() => {
		setBookingTotal(nightlyTotal + cleaningFee + serviceFee);
	}, [nightlyTotal]);

	useEffect(() => {
		if (
			currentRoom &&
			currentRoom.bookings &&
			Object.values(currentRoom.bookings).length > 0
		) {
			let invalidDates = [];
			Object.values(currentRoom.bookings).forEach((rsvp) => {
				const booking = {};
				booking["start"] = rsvp.startDate;
				booking["end"] = rsvp.endDate;
				invalidDates.push(booking);
			});
			setBookedDates(invalidDates);
		}
	}, [currentRoom]);

	return (
		<div className="room-price-card-container">
			<div className="room-price-card">
				<div className="room-price-card-top-text">
					<div className="room-price">
						<span className="card-price">${currentRoom.price}</span>
						<span>night</span>
					</div>
					<div
						className="room-reviews-and-location in-price-card"
						style={{ paddingBottom: "0rem" }}
					>
						★{Number(currentRoom.avgStarRating).toFixed(2)}
						{" · "}
						{Object.values(currentRoom.reviews).length > 0 && (
							<span
								style={{
									marginLeft: ".25rem",
								}}
								id="reviews-modal-link"
								onClick={() => setShowModal(true)}
							>
								{Number(
									Object.values(currentRoom.reviews).length
								)}{" "}
								review(s)
							</span>
						)}
						{Object.values(currentRoom.reviews).length < 1 && (
							<span
								id="reviews-modal-link-inactive"
								style={{
									marginLeft: ".25rem",
								}}
							>
								{Number(
									Object.values(currentRoom.reviews).length
								)}{" "}
								review(s)
							</span>
						)}
					</div>
				</div>
				<form
					className="booking-info"
					onSubmit={(e) => handleSubmit(e)}
				>
					<div className="booking-info-wrapper">
						<div className="choose-dates-container">
							{/* <div className="check-in">
								<div className="check-in-text">CHECK-IN</div>
								<input
									id="check-in"
									type="date"
									value={bookingStartDate
										.toISOString()
										.slice(0, 10)}
									onChange={(e) => onStartDateChange(e)}
									min={startDate.toISOString().slice(0, 10)}
									max={bookingEndDate
										.toISOString()
										.slice(0, 10)}
									invalid={bookedDates}
								></input>
							</div> */}

							{/* <div className="check-out">
								<div className="checkout-text">CHECKOUT</div>
								<input
									id="checkout"
									type="date"
									value={getPreviousDay(bookingEndDate)
										.toISOString()
										.slice(0, 10)}
									onChange={(e) => checkBookingEnd(e)}
									min={getNextDay(bookingStartDate)
										.toISOString()
										.slice(0, 10)}
								></input>
							</div> */}

							<CalendarMenu
								minDate={startDate}
								tileDisabled={checkInvalidTile}
								onChange={calendarOnChange}
								bookingStartDate={bookingStartDate}
								bookingEndDate={bookingEndDate}
								showMenu={showMenu}
								setShowMenu={setShowMenu}
								room={currentRoom}
							></CalendarMenu>
						</div>
						<div className="guests">
							<div className="num-guests">GUESTS</div>
							<div className="custom-select-container">
								<select
									id="guest"
									className="custom-select"
									value={guests}
									onChange={(e) =>
										setGuests(Number(e.target.value))
									}
								>
									{maxGuestsArr.map((num) => {
										return (
											<option value={num} key={num}>
												{num}
											</option>
										);
									})}
								</select>
							</div>
						</div>
					</div>
					{validationErrors.length > 0 &&
						validationErrors.map((err) => {
							return (
								<div key={err} style={{ color: "red" }}>
									{err}
								</div>
							);
						})}
					<button className="edit-btn">Reserve</button>
				</form>
				<div className="pricing-info">
					<div className="price-items">
						<div className="nightly-total">
							<div className="row-detail">
								${currentRoom.price} x {bookingDuration} nights
							</div>
							<div className="row-total">{nightlyTotal}</div>
						</div>

						<div className="cleaning-total">
							<div className="row-detail">Cleaning fee</div>
							<div className="row-total">{cleaningFee}</div>
						</div>

						<div className="nightly-total">
							<div className="row-detail">Service fee</div>
							<div className="row-total">{serviceFee}</div>
						</div>
					</div>
					<div className="price-total">
						<div className="booking-total-detail">
							Total before taxes
						</div>
						<div className="booking-total-price">
							{bookingTotal}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default BookingCard;
