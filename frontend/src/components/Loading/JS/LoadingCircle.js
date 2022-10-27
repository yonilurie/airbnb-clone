import '../CSS/LoadingCircle.css'

const LoadingCircle = () => {
	return (
		<div className="loading-container">
			<div className="lds-ring">
				<div></div>
				<div></div>
				<div></div>
				<div></div>
			</div>
		</div>
	);
};

export default LoadingCircle;
