const User = require('../models/User');
const Movie = require('../models/Movie');

// Add to favorites
exports.addFavorite = async (req, res) => {
  try {
    const { movieId } = req.body;
    
    // First find or create the movie in our DB
    const movieDetails = await tmdbService.getMovieDetails(movieId);
    let movie = await Movie.findOne({ tmdbId: movieId });
    
    if (!movie) {
      movie = await Movie.create({
        tmdbId: movieId,
        title: movieDetails.title,
        overview: movieDetails.overview,
        posterPath: movieDetails.poster_path,
        releaseDate: movieDetails.release_date,
        genres: movieDetails.genres,
        rating: movieDetails.vote_average
      });
    }

    // Add to user's favorites if not already there
    const user = await User.findById(req.user.id);
    if (!user.favorites.includes(movie._id)) {
      user.favorites.push(movie._id);
      await user.save();
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Remove from favorites
exports.removeFavorite = async (req, res) => {
  try {
    const { movieId } = req.params;
    
    const user = await User.findById(req.user.id);
    user.favorites = user.favorites.filter(fav => fav.toString() !== movieId);
    await user.save();
    
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create watchlist
exports.createWatchlist = async (req, res) => {
  try {
    const { name } = req.body;
    
    const user = await User.findById(req.user.id);
    user.watchlists.push({ name, movies: [] });
    await user.save();
    
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add to watchlist
exports.addToWatchlist = async (req, res) => {
  try {
    const { watchlistId, movieId } = req.body;
    
    // First find or create the movie in our DB (similar to addFavorite)
    // ... movie creation logic ...
    
    const user = await User.findById(req.user.id);
    const watchlist = user.watchlists.id(watchlistId);
    
    if (!watchlist.movies.includes(movie._id)) {
      watchlist.movies.push(movie._id);
      await user.save();
    }
    
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};