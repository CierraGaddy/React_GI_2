import React, { useState, useEffect } from "react";
// Bringing in React along with `useState` (to manage component state) and `useEffect` (to handle side effects like API calls).

import axios from "axios";
// Importing axios to make HTTP requests.

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useParams,
} from "react-router-dom";
// Importing React Router tools to handle navigation between pages.

const API_KEY = "13e2f3619e1cbd349cb57c02a17a7100";
// Your personal API key to access the TMDB API.

const BASE_URL = "https://api.themoviedb.org/3";
// Base URL for the TMDB API.

function SearchMovies() {
  // query keeps track of what the user types into the search bar, and movies stores the list of movies from the search.
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);

  function searchMovies() {
    // Making a request to TMDB's movie search endpoint with the user's query.
    axios
      .get(`${BASE_URL}/search/movie`, {
        params: {
          api_key: API_KEY, // API key to authenticate the request.
          query: query, // The search term from the user.
        },
      })
      .then(function (response) {
        // Storing the list of movies from the API response.
        setMovies(response.data.results || []);
      });
  }

  return (
    <div>
      <h1>Movie Search</h1>
      <input
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={function (e) {
          // Updating the query state with whatever the user types.
          setQuery(e.target.value);
        }}
      />
      <button onClick={searchMovies}>Search</button>
      <ul>
        {/* Looping through the `movies` array and creating a list of clickable links for each movie. */}
        {movies.map(function (movie) {
          return (
            <li key={movie.id}>
              <Link to={"/movie/" + movie.id}>{movie.title}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function MovieDetails() {
  const { id } = useParams();
  // id is pulled from the URL, so we know which movie the user clicked on.

  const [movie, setMovie] = useState(null);
  // movie holds the detailed information about a specific movie.

  useEffect(
    function () {
      // Fetching the details for the movie based on the id.
      axios
        .get(`${BASE_URL}/movie/${id}`, {
          params: {
            api_key: API_KEY, // API key to authenticate the request.
          },
        })
        .then(function (response) {
          // Storing the movie details in the movie state.
          setMovie(response.data);
        });
    },
    [id] // The effect runs whenever the id changes.
  );

  if (!movie) {
    // While the movie data is still loading, show this placeholder text.
    return <p>Loading...</p>;
  }

  return (
    <div className="movie-result">
      <h2>{movie.title}</h2>
      <p>{movie.overview}</p>
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
      />
      <p>Release Date: {movie.release_date}</p>
      <p>Rating: {movie.vote_average} / 10</p>
    </div>
  );
}

function App() {
  // Setting up the routes for the app.
  return (
    <Router>
      <Routes>
        {/* Search component. */}
        <Route path="/" element={<SearchMovies />} />

        {/* Details of a specific movie based on its ID. */}
        <Route path="/movie/:id" element={<MovieDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
