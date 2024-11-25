const express = require('express'); // Import Express framework
const path = require('path'); // Core module for handling file and directory paths
const bodyParser = require('body-parser'); // Middleware for parsing request bodies
const mongoose = require('mongoose'); // MongoDB ODM for database operations
require('dotenv').config(); // Load environment variables from .env file

const assignmentsRouter = require('./routes/assignments'); // Import routes for assignments

const app = express(); // Initialize Express app

// Database connection
mongoose.connect(process.env.MONGO_URI) // Connect to MongoDB using URI from .env
  .then(() => console.log('MongoDB connected')) // Log success message if connection is successful
  .catch(err => console.error(err)); // Log error message if connection fails

// Middleware
app.use(bodyParser.urlencoded({ extended: false })); // Parse URL-encoded data from forms
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files from the public folder

// View engine setup
app.set('views', path.join(__dirname, 'views')); // Set the views directory
app.set('view engine', 'ejs'); // Set EJS as the templating engine

// Routes
app.use('/', assignmentsRouter); // Use assignments routes for handling application logic

// Start server
const PORT = process.env.PORT || 3000; // Use port from environment or default to 3000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); // Start server and log message
