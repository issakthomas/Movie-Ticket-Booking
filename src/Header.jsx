import PropTypes from "prop-types";
import "./Header.css";

const Header = ({ user, setUser }) => {
	const changeUser = () => {
		if (user == "normal") setUser("admin");
		else setUser("normal");
	};
	return (
		<header>
			<div className="logo">
				<i className="fa-solid fa-ticket"></i>
				<span>Cinepass</span>
			</div>
			<input id="userSwitch" type="checkbox" />
			<label htmlFor="userSwitch" onClick={changeUser}>
				<span id="admin">ADMIN</span>
				<i className="fa-solid fa-circle-user"></i>
			</label>
		</header>
	);
};

Header.propTypes = {
	user: PropTypes.string.isRequired,
	setUser: PropTypes.func.isRequired,
};
export default Header;
