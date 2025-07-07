require('dotenv').config();
const express = require('express');
const moviesRoute = require('./routes/movies');
const cors = require('cors');
const mongoose = require('mongoose'); 

const app = express();


// Then add your other middleware and routes
app.use(express.json());

// Middleware
app.use(cors());

// Routes
app.use('/api/movies', moviesRoute);

// Database connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));