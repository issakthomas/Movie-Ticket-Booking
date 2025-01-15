import { useEffect, useState } from "react";
import "./Booking.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { addDays, format } from "date-fns";
import { useNavigate } from "react-router-dom";

const Booking = () => {
	const navigate = useNavigate();
	const rows = 10;
	const cols = 10;
	const [selectedSeats, setSelectedSeats] = useState([]);
	const [selectedDate, setSelectedDate] = useState(new Date());
	const [selectedTime, setSelectedTime] = useState("");
	const [popupMessage, setPopupMessage] = useState("");
	const [booking, setBooking] = useState(true);

	useEffect(() => {
		console.log(selectedSeats);
		console.log(format(selectedDate, "MM/dd/yyyy"));
		console.log(selectedTime);
	}, [selectedDate, selectedSeats, selectedTime]);

	const handleSeatClick = (row, col) => {
		const seatId = `${String.fromCharCode(65 + row)}-${col}`;
		setSelectedSeats((prevSelected) => {
			if (prevSelected.includes(seatId)) {
				return prevSelected.filter((seat) => seat !== seatId);
			} else {
				return [...prevSelected, seatId];
			}
		});
	};

	const renderSeats = () => {
		const seats = [];
		for (let row = 0; row < rows; row++) {
			for (let col = 0; col < cols; col++) {
				const seatId = `${String.fromCharCode(65 + row)}-${col}`;
				const isSelected = selectedSeats.includes(seatId);
				seats.push(
					<div
						key={seatId}
						className={`seat ${isSelected ? "selected" : ""}`}
						onClick={() => handleSeatClick(row, col)}
					>
						{seatId}
					</div>
				);
			}
		}
		return seats;
	};

	const handleDateChange = (date) => {
		setSelectedDate(date);
	};

	const handleTimeClick = (time) => {
		setSelectedTime(time);
	};

	const handleBook = () => {
		if (selectedDate && selectedSeats.length > 0 && selectedTime) {
			setBooking(false);
			setPopupMessage("The tickets are booked!");
			setTimeout(() => setPopupMessage(""), 3000);
			setSelectedSeats([]);
			setSelectedTime("");
			setTimeout(() => navigate("/"), 3000);
		} else {
			alert("Please select the options");
		}
	};

	return (
		<>
			{popupMessage && <div className="popup">{popupMessage}</div>}
			{booking ? (
				<div className="booking">
					<div className="seatSection">
						<h2>Select Your Seats</h2>
						<div className="seatLayout">{renderSeats()}</div>
						<div className="screen">SCREEN</div>
					</div>
					<div className="detailSection">
						<div className="datePicker">
							<DatePicker
								selected={selectedDate}
								onChange={handleDateChange}
								minDate={new Date()}
								maxDate={addDays(new Date(), 7)}
								placeholderText="Select a date between today and a week from now"
								dateFormat="MM/dd/yyyy"
							/>
						</div>
						<div className="timePicker">
							{[
								"10:00 AM",
								"01:00 PM",
								"04:00 PM",
								"07:00 PM",
							].map((time) => (
								<div
									key={time}
									className={`timeOption ${
										selectedTime === time ? "selected" : ""
									}`}
									onClick={() => handleTimeClick(time)}
								>
									{time}
								</div>
							))}
						</div>
						<button className="book" onClick={handleBook}>
							Book
						</button>
					</div>
				</div>
			) : (
				<div className="loaderWrapper">
					<div className="loader"></div>
				</div>
			)}
		</>
	);
};

export default Booking;
