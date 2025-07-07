const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

// Add to favorites
router.post('/favorites', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user.favorites.includes(req.body.movieId)) {
      user.favorites.push(req.body.movieId);
      await user.save();
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Remove from favorites
router.delete('/favorites/:movieId', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    user.favorites = user.favorites.filter(id => id !== req.params.movieId);
    await user.save();
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});1

module.exports = router;