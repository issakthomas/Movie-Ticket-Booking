import "./App.css";
import Now from "./components/Now";
import Search from "./components/Search";

function App() {
	return (
		<>
			<header>
				<div className="logo">
					<i className="fa-solid fa-ticket"></i>
					<span>Cinepass</span>
				</div>
				<div className="icon">
					<Search />
					<i className="fa-solid fa-circle-user"></i>
				</div>
			</header>
			<section className="movies">
				<Now />
			</section>
		</>
	);
}

export default App;
