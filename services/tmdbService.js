const axios = require('axios');

const API_KEY = process.env.TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

// Get popular movies
exports.getPopularMovies = async (page = 1) => {
  const response = await axios.get(`${BASE_URL}/movie/popular`, {
    params: { api_key: API_KEY, page }
  });
  return response.data;
};

// Search movies
exports.searchMovies = async (query, page = 1) => {
  const response = await axios.get(`${BASE_URL}/search/movie`, {
    params: { api_key: API_KEY, query, page }
  });
  return response.data;
};

// Get movie details
exports.getMovieDetails = async (movieId) => {
  const response = await axios.get(`${BASE_URL}/movie/${movieId}`, {
    params: { api_key: API_KEY, append_to_response: 'credits,videos,similar' }
  });
  return response.data;
};

// Get genres
exports.getGenres = async () => {
  const response = await axios.get(`${BASE_URL}/genre/movie/list`, {
    params: { api_key: API_KEY }
  });
  return response.data.genres;
};