import '../CSS/Placeholder.css'

const Placeholder = () => {
	return (
		<div className="placeholder-container">
			<div className="placeholder-loading-section-1">
				<div className="loading-strip-1"></div>
				<div className="loading-strip-2"></div>
			</div>
			<div className="placeholder-loading-section-2">
				<div className="placeholder-loading-box-1-container">
					<div className="loading-box-1"></div>
				</div>
				<div className="placeholder-loading-box-2-container">
					<div className="loading-box-2"></div>
					<div
						className="loading-box-2"
						style={{ borderTopRightRadius: "12px" }}
					></div>
					<div className="loading-box-2"></div>
					<div
						className="loading-box-2"
						style={{ borderBottomRightRadius: "12px" }}
					></div>
				</div>
			</div>
			<div className="placeholder-loading-section-3">
				<div className="loading-strip-3"></div>
				<div className="loading-strip-4"></div>
			</div>
		</div>
	);
};

export default Placeholder;
