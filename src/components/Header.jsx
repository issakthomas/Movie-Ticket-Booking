import "./Header.css";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const Header = ({ setUser }) => {
    const changeUser = () => {
        setUser("");
    };

    return (
        <header>
            <Link to={"/"} style={{ textDecoration: "none", color: "black" }}>
                <div className="logoSection">
                    <i className="fa-solid fa-ticket"></i>
                    <span>Cinepass</span>
                </div>
            </Link>
            <i
                onClick={changeUser}
                className="fa-solid fa-circle-user user"
            ></i>
        </header>
    );
};

Header.propTypes = {
    setUser: PropTypes.func.isRequired,
};

export default Header;
