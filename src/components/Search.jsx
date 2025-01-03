import "./Search.css";
import { fetchMovie } from "../services/API";
import { useState } from "react";
import PropTypes from "prop-types";

const Search = ({ setMovies }) => {
	const [query, setQuery] = useState("");

	const handleSearch = async () => {
		try {
			const response = await fetchMovie(query);
			setMovies(response);
		} catch (error) {
			console.error("Error fetching movie: ", error);
		}
	};

	return (
		<div className="search">
			<input
				onChange={(e) => setQuery(e.target.value)}
				type="text"
				placeholder="type to search movie"
				onKeyDown={(e) => {
					if (e.key === "Enter") handleSearch();
				}}
			/>
			<i onClick={handleSearch} className="fa-solid fa-magnifying-glass"></i>
		</div>
	);
};

Search.propTypes = {
	setMovies: PropTypes.func.isRequired,
};

export default Search;
