import { useState } from "react";
import "./App.css";
import Find from "./components/Find";
import Now from "./components/Now";
import Add from "./components/Add";
import Header from "./Header";

function App() {
	const [added, setAdded] = useState([]);
	const [section, setSection] = useState("add");
	const [user, setUser] = useState("normal");
	console.log(added);

	return (
		<>
			<Header user={user} setUser={setUser} />
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
					{section === "find" && <Find />}
					{section === "add" && <Add added={added} setAdded={setAdded} />}
				</section>
			)}
			{user === "normal" && (
				<section className="main">
					<Now added={added} setAdded={setAdded} />
				</section>
			)}
		</>
	);
}

export default App;
