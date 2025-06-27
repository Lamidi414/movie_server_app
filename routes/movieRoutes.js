const express = require('express');
const router = express.Router();
const tmdbService = require('../services/tmdbService');
const authMiddleware = require('../middleware/auth');

// Public routes
router.get('/popular', async (req, res) => {
  try {
    const data = await tmdbService.getPopularMovies(req.query.page);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/search', async (req, res) => {
  try {
    const data = await tmdbService.searchMovies(req.query.query, req.query.page);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const data = await tmdbService.getMovieDetails(req.params.id);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/genres/list', async (req, res) => {
  try {
    const data = await tmdbService.getGenres();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;