import "./Search.css";

const Search = () => {
	return (
		<>
			<div className="search">
				<input type="text" placeholder="type to search movie" />
				<i className="fa-solid fa-magnifying-glass"></i>
			</div>
		</>
	);
};

export default Search;
