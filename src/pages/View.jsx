import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./View.css";

const View = () => {
	const navigate = useNavigate();
	const { id } = useParams();
	const [movieDetails, setMovieDetails] = useState({});

	const serverFetch = async (id) => {
		try {
			const response = await axios.get("http://localhost:3000/movies");
			const movie = response.data.find((movie) => movie.id == id);
			setMovieDetails(movie);
		} catch (error) {
			console.error("Error fetching data:", error.message);
		}
	};

	useEffect(() => {
		serverFetch(id);
	}, [id]);

	useEffect(() => {
		console.log(movieDetails);
	}, [movieDetails]);

	return (
		<div
			className="view"
			style={{
				backgroundImage: `url(https://image.tmdb.org/t/p/w500/${movieDetails.backdrop_path})`,
			}}
		>
			<div
				key={movieDetails.id}
				className="movieCard"
				style={{
					backgroundImage: movieDetails.poster_path
						? `url(https://image.tmdb.org/t/p/w500/${movieDetails.poster_path})`
						: "url(/poster.png)",
				}}
			></div>
			<div className="details">
				<h1>{movieDetails?.title}</h1>
				<span>{movieDetails?.overview}</span>
				<p>Release Date: {movieDetails.release_date}</p>
				<button onClick={() => navigate(`/${movieDetails.id}/booking`)}>
					Book Ticket
				</button>
			</div>
		</div>
	);
};

export default View;
