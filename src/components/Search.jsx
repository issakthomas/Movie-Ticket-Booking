import "./Search.css";
import fetchMovie from "./tmdbFetch";
import { useState } from "react";
import PropTypes from "prop-types";

const Search = ({ setMovies }) => {
	const [query, setQuery] = useState("");
	const handleSearch = async () => {
		const response = await fetchMovie(query);
		setMovies(response);
	};
	return (
		<>
			<div className="search">
				<input
					onChange={(e) => setQuery(e.target.value)}
					type="text"
					placeholder="type to search movie"
				/>
				<i onClick={handleSearch} className="fa-solid fa-magnifying-glass"></i>
			</div>
		</>
	);
};

Search.propTypes = {
	setMovies: PropTypes.func.isRequired,
};

export default Search;
