// Load environment variables
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const taskRoutes = require('./routes/tasks');

// Initialize Express app
const app = express();

// --- Middleware ---
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(helmet()); // Set essential security headers
app.use(morgan('dev')); // Log HTTP requests in development
app.use(express.json()); // Parse JSON request bodies

// --- Database Connection ---
const mongoURI = process.env.MONGO_URI;
if (!mongoURI) {
  console.error("FATAL ERROR: MONGO_URI is not defined.");
  process.exit(1);
}

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Successfully connected to MongoDB Atlas!'))
  .catch(error => console.error('Error connecting to MongoDB Atlas:', error));


// --- API Routes ---
app.use('/api/tasks', taskRoutes);

// --- Health Check Route for Monitoring ---
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});


// --- Server Initialization ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});