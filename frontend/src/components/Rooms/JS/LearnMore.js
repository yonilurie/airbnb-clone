import { Modal } from "../../../context/Modal";

const LearnMore = ({ setShowLearnMore }) => {
	return (
		<Modal onClose={() => setShowLearnMore(false)}>
			<div className="learn-more-modal">
				<div className="learn-more-modal-top">
					<div className="exit-learn-more-header">
						<div
							className="exit-learn-more"
							onClick={() => setShowLearnMore(false)}
						>
							X
						</div>
					</div>
				</div>
				<div className="learn-more-subheader">
					<div>
						{" "}
						<img
							className="aircover-logo in-modal"
							src="https://a0.muscache.com/im/pictures/54e427bb-9cb7-4a81-94cf-78f19156faad.jpg"
						></img>
					</div>
					<div className="learn-more-subheader-description">
						AirCover is comprehensive protection included for free
						with every booking.
					</div>
				</div>
				<div className="learn-more-content-box">
					<div className="learn-more-grid-cell">
						<div className="learn-more-grid-cell-title">
							Booking Protection Guarantee
						</div>
						<div className="learn-more-grid-cell-text">
							In the unlikely event a Host needs to cancel your
							booking within 30 days of check-in, we’ll find you a
							similar or better home, or we’ll refund you.
						</div>
					</div>
					<div className="learn-more-grid-cell">
						<div className="learn-more-grid-cell-title">
							Check-In Guarantee
						</div>
						<div className="learn-more-grid-cell-text">
							If you can’t check into your home and the Host
							cannot resolve the issue, we’ll find you a similar
							or better home for the length of your original stay,
							or we’ll refund you.
						</div>
					</div>
					<div className="learn-more-grid-cell">
						<div className="learn-more-grid-cell-title">
							Get-What-You-Booked Guarantee
						</div>
						<div className="learn-more-grid-cell-text">
							If at any time during your stay you find your
							listing isn't as advertised—for example, the
							refrigerator stops working and your Host can’t
							easily fix it, or it has fewer bedrooms than
							listed—you'll have three days to report it and we’ll
							find you a similar or better home, or we’ll refund
							you.
						</div>
					</div>
					<div className="learn-more-grid-cell">
						<div className="learn-more-grid-cell-title">
							24-hour Safety Line
						</div>
						<div className="learn-more-grid-cell-text">
							If you ever feel unsafe, you’ll get priority access
							to specially-trained safety agents, day or night.
						</div>
					</div>
				</div>
			</div>
		</Modal>
	);
};

export default LearnMore;
