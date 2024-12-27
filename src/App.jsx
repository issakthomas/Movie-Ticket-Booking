import { useState } from "react";
import "./App.css";
import Find from "./components/Find";
import Now from "./components/Now";
import Add from "./components/Add";

function App() {
	const [movies, setMovies] = useState([]);
	const [section, setSection] = useState("add");
	const [user, setUser] = useState("normal");
	const changeUser = () => {
		if (user == "normal") setUser("admin");
		else setUser("normal");
	};
	console.log(user);

	console.log(section);
	return (
		<>
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
			{user === "admin" && (
				<section className="main">
					<div className="buttons">
						<button
							value="add"
							onClick={(e) => setSection(e.target.value)}
							style={{ border: section == "add" ? "1px solid" : 0 }}
						>
							Add
						</button>
						<button
							value="find"
							onClick={(e) => setSection(e.target.value)}
							style={{ border: section == "find" ? "1px solid" : 0 }}
						>
							Find
						</button>
					</div>
					{section === "find" && <Find movies={movies} setMovies={setMovies} />}
					{section === "add" && <Add />}
				</section>
			)}
			{user === "normal" && (
				<section className="main">
					<Now />
				</section>
			)}
		</>
	);
}

export default App;
