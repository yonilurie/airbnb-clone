const Errors = ({error}) => {
	return (
		<div key={error} className="error">
			{error}
		</div>
	);
};

export default Errors;
