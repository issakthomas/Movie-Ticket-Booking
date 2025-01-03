import { useEffect, useState } from "react";
import "./Now.css";
import axios from "axios";

const Now = () => {
	const [added, setAdded] = useState([]);
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

	return (
		<>
			{added.length > 0 && (
				<div className="now">
					<div className="nowTitle title">
						<span>Now Playing</span>
						<div className="line">
							<hr />
						</div>
					</div>
					<div className="movieList">
						{added.map((movie) => (
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
				</div>
			)}
		</>
	);
};

export default Now;
