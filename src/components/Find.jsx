import Search from "./Search";
import { useState } from "react";
import axios from "axios";

const Find = () => {
	const [movies, setMovies] = useState([]);
	const [popupMessage, setPopupMessage] = useState("");

	const addMovie = async (movie) => {
		movie = { ...movie, id: movie.id.toString() };
		const response = await axios.get(
			"https://movie-ticket-booking-server-rqrt.onrender.com/movies"
		);
		if (response.data.some((m) => m.id == movie.id)) {
			setPopupMessage(`${movie.title} is already in the list!`);
			setTimeout(() => setPopupMessage(""), 3000);
			console.log(movies);
			return;
		}
		await axios.post(
			"https://movie-ticket-booking-server-rqrt.onrender.com/movies",
			movie
		);
		setPopupMessage(`${movie.title} has been added to the list!`);
		setTimeout(() => setPopupMessage(""), 3000);
	};

	return (
		<>
			<Search setMovies={setMovies} />
			{popupMessage && <div className="popup">{popupMessage}</div>}
			{movies.length > 0 && (
				<div className="cardSection">
					<div className="titleSection">
						<span>Available Movies</span>
						<div></div>
					</div>
					<div className="movieSection">
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
				</div>
			)}
		</>
	);
};

export default Find;
