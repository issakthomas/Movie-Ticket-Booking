import { useEffect } from "react";
import "./Now.css";
import PropTypes from "prop-types";
import axios from "axios";

const Now = ({ added, setAdded }) => {
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
	},[]);
	return (
		<>
			<div className="title">
				<span>Now Playing</span>
				<div className="line">
					<hr />
				</div>
			</div>
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
						>
							<h3>{movie.title}</h3>
						</div>
					))}
			</div>
		</>
	);
};

Now.propTypes = {
	added: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.number.isRequired,
			title: PropTypes.string.isRequired,
			poster_path: PropTypes.string,
		})
	).isRequired,
	setAdded: PropTypes.func.isRequired,
};

export default Now;
