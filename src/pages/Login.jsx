import { useState } from "react";
import "./Login.css";
import PropTypes from "prop-types";
import axios from "axios";

const Login = ({ setUser }) => {
    const [signup, setSignup] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        username: "",
        password: "",
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: value,
        }));
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get("http://localhost:3000/users");
            const user = response.data.find(
                (user) =>
                    user.username === formData.username &&
                    user.password === formData.password
            );
            if (user) {
                if (formData.username === "admin") {
                    setUser("admin");
                } else {
                    setUser("normal");
                }
                console.log("Login successful:", user);
            } else {
                console.log("Invalid username or password");
            }
        } catch (error) {
            console.log("Error fetching users:", error);
        }
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            const newUser = {
                name: formData.name,
                username: formData.username,
                password: formData.password,
            };
            const response = await axios.post(
                "http://localhost:3000/users",
                newUser
            );
            console.log("Signup successful:", response.data);
            setSignup(false);
        } catch (error) {
            console.log("Error signing up:", error);
        }
    };

    return (
        <div className="login">
            <form
                id="form"
                className="card"
                onSubmit={signup ? handleSignup : handleLogin}
            >
                <div className="logo">
                    <i className="fa-solid fa-ticket"></i>
                    <span>Cinepass</span>
                </div>
                {signup && (
                    <div>
                        <label htmlFor="name">Name</label>
                        <input
                            id="name"
                            type="text"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                )}
                <label htmlFor="username">Username</label>
                <input
                    id="username"
                    type="text"
                    value={formData.username}
                    onChange={handleChange}
                    required
                />
                <label htmlFor="password">Password</label>
                <input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                <div>
                    <span
                        className="ask"
                        onClick={() => setSignup((prev) => !prev)}
                    >
                        {signup
                            ? "Already have an account? Login"
                            : "Don't have an account? Sign Up"}
                    </span>
                    <button type="submit">
                        {signup ? "Sign Up" : "Login"}
                    </button>
                </div>
            </form>
        </div>
    );
};

Login.propTypes = {
    setUser: PropTypes.func.isRequired,
};

export default Login;
