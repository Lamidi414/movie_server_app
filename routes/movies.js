const express = require('express');
const router = express.Router();
const axios = require('axios');
require('dotenv').config();

// Get your API key from TMDB and add to .env
const TMDB_API_KEY = process.env.TMDB_API_KEY;

// Real API implementation
router.get('/popular', async (req, res) => {
  try {
    const { page = 1 } = req.query;
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/popular?api_key=${TMDB_API_KEY}&page=${page}`
    );
    res.json(response.data);
  } catch (err) {
    console.error('TMDB API Error:', err);
    res.status(500).json({ error: 'Failed to fetch movies' });
  }
});

module.exports = router;