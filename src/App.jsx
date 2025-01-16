import "./App.css";
import Header from "./components/Header";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import { useState } from "react";
import View from "./pages/View";
import Booking from "./pages/Booking";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
	const [user, setUser] = useState("normal");

	return (
		<>
			<Header user={user} setUser={setUser} />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/:id" element={<View />} />
				<Route path="/:id/booking" element={<Booking />} />
				<Route path="/admin/*" element={<Admin />} />
				<Route path="*" element={<Home />} />
			</Routes>
		</>
	);
}

export default App;
