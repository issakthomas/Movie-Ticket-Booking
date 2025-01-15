import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";

const Add = () => {
	const [added, setAdded] = useState([]);
	const [popupMessage, setPopupMessage] = useState("");
	const [loading, setLoading] = useState(true);

	const serverFetch = async () => {
		try {
			const response = await axios.get(
				"https://movie-ticket-booking-server-rqrt.onrender.com/movies"
			);
			setAdded(response.data);
		} catch (error) {
			console.error("Error fetching data:", error.message);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		serverFetch();
	}, []);

	const removeMovie = async (movie) => {
		await axios.delete(
			`https://movie-ticket-booking-server-rqrt.onrender.com/movies/${movie.id}`
		);
		setPopupMessage(`${movie.title} has been removed from the list!`);
		setTimeout(() => setPopupMessage(""), 3000);
		serverFetch();
	};

	if (loading) {
		return (
			<div className="loaderWrapper">
				<div className="loader"></div>
			</div>
		);
	}

	return (
		<>
			{popupMessage && <div className="popup">{popupMessage}</div>}
			{added.length > 0 && (
				<div className="cardSection">
					<div className="titleSection">
						<span>Added Movies</span>
						<div></div>
					</div>
					<div className="movieSection">
						{added.map((movie) => (
							<div
								key={movie.id}
								className="movieCard"
								style={{
									backgroundImage: movie.poster_path
										? `url(https://image.tmdb.org/t/p/w500/${movie.poster_path})`
										: "url(/poster.png)",
								}}
								onClick={() => removeMovie(movie)}
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

export default Add;
