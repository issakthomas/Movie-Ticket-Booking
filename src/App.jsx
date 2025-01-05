import "./App.css";
import Header from "./components/Header";
import { Route, Routes, useNavigate } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import { useEffect, useState } from "react";

function App() {
    const [user, setUser] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if (user === "normal") {
            navigate("/");
        } else if (user === "admin") {
            navigate("/admin");
        }
        // else {
        //     navigate("/login");
        // }
    }, [user, navigate]);

    return (
        <>
            {(user === "normal" || user === "admin") && (
                <Header setUser={setUser} />
            )}
            <Routes>
                <Route path="/login" element={<Login setUser={setUser} />} />
                <Route path="/" element={<Home />} />
                <Route path="/admin/*" element={<Admin />} />
                <Route path="*" element={<Login setUser={setUser} />} />
            </Routes>
        </>
    );
}

export default App;
