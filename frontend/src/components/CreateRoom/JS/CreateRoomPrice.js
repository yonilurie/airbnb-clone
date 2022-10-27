const CreateRoomPrice = ({ price, setPrice }) => {
	return (
		<div className="input-container price">
			<label htmlFor="price" className="form-label">
				Nightly Price
			</label>
			<input
				type="number"
				className="form-input"
				min="1"
				max="1000"
				step="1"
				value={price}
				maxLength="4"
				onInput={(e) => {
					if (e.target.value.length > e.target.maxLength) {
						e.target.value = e.target.value.slice(
							0,
							e.target.maxLength
						);
					}
				}}
				id="price"
				onChange={(e) => setPrice(e.target.value)}
				required
			></input>
		</div>
	);
};

export default CreateRoomPrice;
