const BookingPageDirections = ({ room }) => {
	return (
		<div className="booking-page-directions">
			<h3 className="booking-page-directions-label">Getting there</h3>
			<div className="booking-page-address">
				<h4>Address</h4>
				{room.address}
				<br></br>
				{room.city}
				{", "}
				{room.state}
			</div>
			<div className="directions-cards">
				<div
					className="direction-card"
					onClick={async () => {
						await navigator.clipboard.writeText(
							`${room.address} ${room.city}, ${room.state}`
						);
						alert("Copied address to clipboard");
					}}
				>
					Copy address
				</div>
				<a
					href={`https://www.google.com/maps/search/?api=1&query=${room.lat}%2C${room.lng}`}
					className="direction-card"
					target="_blank"
					rel="noreferrer"
				>
					Get directions
				</a>
			</div>
		</div>
	);
};

export default BookingPageDirections;
