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
            <div className="logoSection" onClick={() => setAdmin(false)}>
                <i className="fa-solid fa-ticket"></i>
                <span>Cinepass</span>
            </div>

            <i
                onClick={() => setAdmin(!admin)}
                className="fa-solid fa-circle-user user"
            ></i>
        </header>
    );
};

export default Header;
