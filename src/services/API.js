import axios from "axios";

export const fetchMovie = async (query) => {
	try {
		const options = {
			method: "GET",
			url: `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`,
			headers: {
				accept: "application/json",
				Authorization:
					"Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0Yzc3NTVmMDYyYzdkZTJjZTU4ZTM1N2FmOTM5ZTE0YiIsIm5iZiI6MTczNTE5MjM4Ni43NjYsInN1YiI6IjY3NmNlZjQyZTI5NzZiYTc1YjkyN2M2MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.vPBckQ9G4_1PBEinAvuyMWcv9c9L7xo-cqtDAX4J4h0",
			},
		};
		const response = await axios.request(options);
		return response.data.results;
	} catch (error) {
		console.error("Error fetching movie from server: ", error);
		throw error;
	}
};
