const RoomSize = ({
	guests,
	setGuests,
	bedrooms,
	setBedrooms,
	beds,
	setBeds,
	baths,
	setBaths,
}) => {
	//Set the amount of bedrooms, beds, baths, guests,
	const setSize = (func, calc, state) => {
		if (calc === "-" && state > 1) func((state) => state - 1);
		if (calc === "+" && state < 10) func((state) => state + 1);
	};

	return (
		<div className="input-container size">
			<div className="input-toggle-container">
				<label>Guests</label>
				<div className="input-toggle">
					<button
						className={`input-minus ${
							guests === 1 && "toggle-disabled"
						}`}
						type="button"
						onClick={() => {
							setSize(setGuests, "-", guests);
						}}
					>
						-
					</button>
					<div className="input-nums">{guests}</div>
					<button
						className={`input-plus ${
							guests === 10 && "toggle-disabled"
						}`}
						type="button"
						onClick={() => {
							setSize(setGuests, "+", guests);
						}}
					>
						+
					</button>
				</div>
			</div>
			<div className="input-toggle-container">
				<label>Bedrooms</label>
				<div className="input-toggle">
					<button
						className={`input-plus ${
							bedrooms === 1 && "toggle-disabled"
						}`}
						type="button"
						onClick={() => {
							setSize(setBedrooms, "-", bedrooms);
						}}
					>
						-
					</button>
					<div className="input-nums">{bedrooms}</div>
					<button
						className={`input-plus ${
							bedrooms === 10 && "toggle-disabled"
						}`}
						type="button"
						onClick={() => {
							setSize(setBedrooms, "+", bedrooms);
						}}
					>
						+
					</button>
				</div>
			</div>
			<div className="input-toggle-container">
				<label>Beds</label>
				<div className="input-toggle">
					<button
						className={`input-minus ${
							beds === 1 && "toggle-disabled"
						}`}
						type="button"
						onClick={() => {
							setSize(setBeds, "-", beds);
						}}
					>
						-
					</button>
					<div className="input-nums">{beds}</div>
					<button
						className={`input-plus ${
							beds === 10 && "toggle-disabled"
						}`}
						type="button"
						onClick={() => {
							setSize(setBeds, "+", beds);
						}}
					>
						+
					</button>
				</div>
			</div>
			<div className="input-toggle-container">
				<label>Baths</label>
				<div className="input-toggle">
					<button
						className={`input-minus ${
							baths === 1 && "toggle-disabled"
						}`}
						type="button"
						onClick={() => {
							setSize(setBaths, "-", baths);
						}}
					>
						-
					</button>
					<div className="input-nums">{baths}</div>
					<button
						className={`input-plus ${
							baths === 10 && "toggle-disabled"
						}`}
						type="button"
						onClick={() => {
							setSize(setBaths, "+", baths);
						}}
					>
						+
					</button>
				</div>
			</div>
		</div>
	);
};

export default RoomSize;
