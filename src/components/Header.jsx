import { useNavigate, useLocation } from "react-router-dom";
import "./Header.css";
import { useEffect, useState } from "react";

const Header = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const [admin, setAdmin] = useState(false);

	useEffect(() => {
		if (admin && !location.pathname.startsWith("/admin")) {
			navigate("/admin/add");
		} else if (!admin && location.pathname.startsWith("/admin")) {
			navigate("/");
		}
	}, [admin, navigate, location.pathname]);

	return (
		<header>
			<div className="logoSection" onClick={() => navigate("/")}>
				<i className="fa-solid fa-ticket"></i>
				<span>Cinepass</span>
			</div>

			<div className="iconSection" onClick={() => setAdmin(!admin)}>
				<span style={{ display: !admin && "none" }}>ADMIN</span>
				<i className="fa-solid fa-circle-user user"></i>
			</div>
		</header>
	);
};

export default Header;
