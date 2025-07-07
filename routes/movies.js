const express = require('express');
const router = express.Router();
const axios = require('axios');
require('dotenv').config();

const TMDB_API_KEY = process.env.TMDB_API_KEY;

// Get popular movies
router.get('/popular', async (req, res) => {
  try {
    const page = req.query.page || 1;
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/popular?api_key=${TMDB_API_KEY}&page=${page}`
    );
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get movie details
router.get('/:id', async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${req.params.id}?api_key=${TMDB_API_KEY}`
    );
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get genres
router.get('/genres', async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${TMDB_API_KEY}`
    );
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;