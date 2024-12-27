import PropTypes from "prop-types";
import "./Find.css";
import Search from "./Search";
import axios from "axios";

const Find = ({ movies, setMovies }) => {
	const addMovie = async (movie) => {
		await axios.post("http://localhost:3000/movies", movie);
	};
	console.log(movies);
	return (
		<>
			<Search setMovies={setMovies} />
			<div className="title">
				<span>Find Moive</span>
				<div className="line">
					<hr />
				</div>
			</div>
			<div className="movieList">
				{movies.length > 0 &&
					movies.map((movie) => (
						<div
							key={movie.id}
							className="movieCard"
							style={{
								backgroundImage: movie.poster_path
									? `url(https://image.tmdb.org/t/p/w500/${movie.poster_path})`
									: "url(/poster.png)",
							}}
							onClick={() => addMovie(movie)}
						>
							<h3>{movie.title}</h3>
						</div>
					))}
			</div>
		</>
	);
};

Find.propTypes = {
	movies: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.number.isRequired,
			title: PropTypes.string.isRequired,
			poster_path: PropTypes.string,
		})
	).isRequired,
	setMovies: PropTypes.func.isRequired,
};

export default Find;
