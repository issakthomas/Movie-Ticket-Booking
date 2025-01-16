import { useEffect, useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const Add = () => {
	const [added, setAdded] = useState([]);
	const [popupMessage, setPopupMessage] = useState("");
	const [loading, setLoading] = useState(true);
	const [current, setCurrent] = useState([]);

	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

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

	const confirmRemoveMovie = (movie) => {
		handleShow();
		setCurrent(movie);
	};

	const removeMovie = async (movie) => {
		try {
			await axios.delete(
				`https://movie-ticket-booking-server-rqrt.onrender.com/movies/${movie.id}`
			);
			setPopupMessage(`${movie.title} has been removed from the list!`);
			setTimeout(() => setPopupMessage(""), 3000);
			serverFetch();
		} catch (error) {
			console.error("Error removing movie:", error.message);
		}
		handleClose();
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
								onClick={() => confirmRemoveMovie(movie)}
							>
								<h3>{movie.title}</h3>
							</div>
						))}
					</div>
				</div>
			)}
			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Remove Movie?</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					Are you sure you want to remove this movie?
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Cancel
					</Button>
					<Button
						variant="primary"
						onClick={() => removeMovie(current)}
					>
						Remove
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
};

export default Add;
