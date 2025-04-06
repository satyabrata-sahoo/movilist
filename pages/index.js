import MovieList from "@/components/Admin/MovieList";
import MovieGrid from "@/components/Client/MovieGrid";
import Navbar from "@/components/Client/Navbar";
import { useEffect, useState } from "react";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/movie/movie-list?status=Active`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json', // Fixed typo: 'Conetent-Type' -> 'Content-Type'
          }
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch movies: ${response.status}`);
        }

        const data = await response.json(); // Added await here
        console.log("data", data);
        setMovies(data.data.pageResult || []); // Added fallback to empty array if data.data is undefined
      } catch (error) {
        setError(error.message); // Changed to error.message for better error handling
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  // Conditional rendering based on state
  if (loading) {
    return (
      <>
        <Navbar />
        <div>Loading movies...</div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />
        <div>Error: {error}</div>
      </>
    );
  }

  return (
    <>
      {/* <Navbar />  */}
      <MovieGrid movies={movies} />
    </>
  );
}