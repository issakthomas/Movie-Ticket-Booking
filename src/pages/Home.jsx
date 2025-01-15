import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = () => {
	const [added, setAdded] = useState([]);
	const [loading, setLoading] = useState(true);
	const [currentSlide, setCurrentSlide] = useState(0);
	const [isTransitioning, setIsTransitioning] = useState(true);

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

	useEffect(() => {
		const interval = setInterval(() => {
			setIsTransitioning(true);
			setCurrentSlide((prev) => prev + 1);
		}, 3000);
		return () => clearInterval(interval);
	}, [added]);

	useEffect(() => {
		if (currentSlide === added.length + 1) {
			setTimeout(() => {
				setIsTransitioning(false);
				setCurrentSlide(1);
			}, 500);
		}
	}, [currentSlide, added]);

	if (loading) {
		return (
			<div className="loaderWrapper">
				<div className="loader"></div>
			</div>
		);
	}

	const carouselStyle = {
		display: "flex",
		transform: `translateX(-${currentSlide * 100}%)`,
		transition: isTransitioning ? "transform 0.5s ease-in-out" : "none",
		height: "100%",
	};

	return (
		<>
			{added.length > 0 && (
				<div
					className="carouselWrapper"
					style={{
						overflow: "hidden",
						width: "100%",
						height: "60vh",
						borderRadius: "5px",
						marginBottom: "20px",
					}}
				>
					<div className="carouselInner" style={carouselStyle}>
						{added.length > 0 && (
							<div
								style={{
									minWidth: "100%",
									boxSizing: "border-box",
								}}
							>
								<img
									src={
										added[added.length - 1].poster_path
											? `https://image.tmdb.org/t/p/original/${
													added[added.length - 1]
														.backdrop_path
											  }`
											: "/poster.png"
									}
									alt={added[added.length - 1].title}
									style={{
										width: "100%",
										height: "100%",
										objectFit: "cover",
										objectPosition: "0 top",
									}}
								/>
							</div>
						)}
						{added.map((movie, index) => (
							<div
								key={index}
								style={{
									minWidth: "100%",
									boxSizing: "border-box",
								}}
							>
								<img
									src={
										movie.poster_path
											? `https://image.tmdb.org/t/p/original/${movie.backdrop_path}`
											: "/poster.png"
									}
									alt={movie.title}
									style={{
										width: "100%",
										height: "100%",
										objectFit: "cover",
										objectPosition: "center",
									}}
								/>
							</div>
						))}
						{added.length > 0 && (
							<div
								style={{
									minWidth: "100%",
									boxSizing: "border-box",
								}}
							>
								<img
									src={
										added[0].poster_path
											? `https://image.tmdb.org/t/p/original/${added[0].backdrop_path}`
											: "/poster.png"
									}
									alt={added[0].title}
									style={{
										width: "100%",
										height: "100%",
										objectFit: "cover",
										objectPosition: "center",
									}}
								/>
							</div>
						)}
					</div>
				</div>
			)}

			{added.length > 0 && (
				<div className="cardSection">
					<div className="titleSection">
						<span>Now Playing</span>
						<div></div>
					</div>
					<div className="movieSection">
						{added.map((movie) => (
							<Link
								to={`/${movie.id}`}
								key={movie.id}
								style={{ textDecoration: "none" }}
							>
								<div
									className="movieCard"
									style={{
										backgroundImage: movie.poster_path
											? `url(https://image.tmdb.org/t/p/w500/${movie.poster_path})`
											: "url(/poster.png)",
									}}
								>
									<h3>{movie.title}</h3>
								</div>
							</Link>
						))}
					</div>
				</div>
			)}
		</>
	);
};

export default Home;
