import { useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";

const Add = ({ added, setAdded }) => {
	const serverFetch = async () => {
		try {
			const response = await axios.get("http://localhost:3000/movies");
			setAdded(response.data);
		} catch (error) {
			console.error("Error fetching data:", error.message);
		}
	};
	useEffect(() => {
		serverFetch();
	}, []);

	const removeMovie = async (id) => {
		setAdded(added.filter((movie) => movie.id !== id));
		console.log(added);
	};

	return (
		<>
			{added.length > 0 && (
				<div className="movieList">
					{added.length > 0 &&
						added.map((movie) => (
							<div
								key={movie.id}
								className="movieCard"
								style={{
									backgroundImage: movie.poster_path
										? `url(https://image.tmdb.org/t/p/w500/${movie.poster_path})`
										: "url(/poster.png)",
								}}
								onClick={() => removeMovie(movie.id)}
							>
								<h3>{movie.title}</h3>
							</div>
						))}
				</div>
			)}
		</>
	);
};

Add.propTypes = {
	added: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.number.isRequired,
			title: PropTypes.string.isRequired,
			poster_path: PropTypes.string,
		})
	).isRequired,
	setAdded: PropTypes.func.isRequired,
};

export default Add;
