import { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
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
      {added.length > 0 ? (
        <div className="cardSection">
          <div className="titleSection">
            <span>Now Playing</span>
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
              >
                <h3>{movie.title}</h3>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="empty">
          &ldquo;No showtimes available... but every blockbuster starts with a
          blank screen.&quot;
        </div>
      )}
    </>
  );
};

export default Home;
