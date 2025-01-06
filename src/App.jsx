import "./App.css";
import Header from "./components/Header";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import { useState } from "react";

function App() {
    const [user, setUser] = useState("normal");

    return (
        <>
            <Header user={user} setUser={setUser} />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/admin/*" element={<Admin />} />
                <Route path="*" element={<Home />} />
            </Routes>
        </>
    );
}

export default App;
