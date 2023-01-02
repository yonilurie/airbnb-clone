import "./CSS/index.css";

const Footer = () => {
	return (
		<div className="footer">
			<div className="footer-left">
				<span>2023 A-bnb clone · </span>
				<span>JavaScript · </span>
				<span>Express · </span>
				<span>React · </span>
				<span>Sequelize · </span>
				<span>AWS · </span>
				<span>Google Maps API</span>
			</div>
			<div className="footer-right">
				<span>
					<a
						href="https://www.linkedin.com/in/yonilurie/"
						target="_blank"
						rel="noreferrer"
					>
						LinkedIn
					</a>
				</span>
				<span>
					<a
						href="https://github.com/yonilurie"
						target="_blank"
						rel="noreferrer"
					>
						Github
					</a>
				</span>
				<span>
					<a
						href="https://angel.co/u/yonatan-lurie"
						target="_blank"
						rel="noreferrer"
					>
						Angellist
					</a>
				</span>
			</div>
		</div>
	);
};

export default Footer;
