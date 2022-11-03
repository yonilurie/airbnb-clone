import "./CSS/index.css";

const Footer = () => {
	return (
		<div className="footer">
			<div className="footer-left">
				<span>2022 Airbnb Clone · </span>
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
					>
						LinkedIn
					</a>
				</span>
				<span>
					<a href="https://github.com/yonilurie" target="_blank">
						Github
					</a>
				</span>
				<span>
					<a href="https://angel.co/u/yonatan-lurie" target="_blank">
						Angellist
					</a>
				</span>
			</div>
		</div>
	);
};

export default Footer;
