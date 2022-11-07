type Props = {
	error: string
}

const Errors = ({ error }: Props) => {
	return (
		<div key={error} className="error">
			{error}
		</div>
	);
};

export default Errors;
