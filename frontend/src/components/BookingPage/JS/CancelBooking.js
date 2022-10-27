import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { deleteBooking } from "../../../store/session";

const CancelBooking = ({ booking }) => {
	const dispatch = useDispatch();
	const history = useHistory();

	const cancelBooking = () => {
		dispatch(deleteBooking(booking.id)).then(() => {
			history.push("/trips");
		});
	};
	
	return (
		<div className="cancel-booking-modal">
			<h3>Are you sure you want to cancel your reservation?</h3>
			<div>Confirming cancellation is not reversable</div>
			<button className="cancel-btn" onClick={() => cancelBooking()}>
				Confirm
			</button>
		</div>
	);
};

export default CancelBooking;
