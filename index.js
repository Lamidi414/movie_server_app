require('dotenv').config();
const express = require('express');
const moviesRouter = require('./routes/movies');
const cors = require('cors');
const mongoose = require('mongoose'); 

const app = express();

// Test route - Add this before any other middleware
app.get('/api/movies', (req, res) => {
  res.json([{ id: 1, title: 'Test Movie' }]); // Dummy data
});

// Then add your other middleware and routes
app.use(express.json());

// Middleware
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());

// Routes
app.use('/api/movies', moviesRouter);

// Database connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));