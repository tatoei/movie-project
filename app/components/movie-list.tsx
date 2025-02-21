"use client";

import { useState, useEffect } from "react";
import axios from "axios";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
}

interface MovieListProps {
  addToCart: (movie: Movie) => void;
  cart: Movie[];
}

const MovieList = ({ addToCart, cart }: MovieListProps) => {
  const [search, setSearch] = useState<string>("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [errMsg, setErrMsg] = useState("");

  const fetchMovies = async (query: string) => {
    if (!query) return;
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?query=${query}`,
        {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5OTE5MjEyNDY3NGNjODRkNzg1Y2M4MmZkZmRiNWI4ZCIsIm5iZiI6MTc0MDA1MzA3NC45MTYsInN1YiI6IjY3YjcxYTUyOWY3ZmIyYTc0MzY1NzBmNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.QKDDCleZDJryKD407mAG4gpgJUuI3xBf9awkxu2GrD4`,
          },
        }
      );
      setMovies(response.data.results);
    } catch (error: any) {
      console.error("Error fetching movies:", error.message);
      setErrMsg(error.message);
    } finally {
      setErrMsg("");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (search) {
      const delayDebounceFn = setTimeout(() => {
        fetchMovies(search);
      }, 500);
      return () => clearTimeout(delayDebounceFn);
    } else {
      setMovies([]);
    }
  }, [search]);

  // ตรวจสอบว่าภาพยนตร์อยู่ในตะกร้าหรือไม่
  const isMovieInCart = (movieId: number) => {
    return cart?.some((item) => item.id === movieId);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Movie List</h2>
      <input
        type="text"
        placeholder="Search movies..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {loading && <p className="text-gray-500">Loading...</p>}
      <ul className="space-y-4">
        {movies.map((movie) => (
          <li
            key={`${movie.id}-${movie.title}`}
            className="flex items-center gap-4"
          >
            {movie.poster_path && (
              <img
                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                alt={movie.title}
                className="w-20 h-auto rounded-lg"
              />
            )}
            <div className="flex-1">
              <h3 className="text-lg font-semibold">{movie.title}</h3>
              <p className="text-sm text-gray-600 line-clamp-2">
                {movie.overview}
              </p>
            </div>
            <button
              onClick={() => addToCart(movie)}
              disabled={isMovieInCart(movie.id)}
              className={`bg-blue-500 text-white px-3 py-1 rounded-lg ${
                isMovieInCart(movie.id)
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-blue-600"
              }`}
            >
              {isMovieInCart(movie.id) ? "Added" : "Add to Cart"}
            </button>
          </li>
        ))}
      </ul>
      {errMsg && (
        <div className="p-5 rounded-lg border border-red-500 text-red-500">
          <p className="text-red-500">{errMsg}</p>
        </div>
      )}
    </div>
  );
};

export default MovieList;
