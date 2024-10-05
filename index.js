const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const eventRoutes = require('./routes/eventRoutes'); // Ensure this path is correct

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json()); // To parse JSON bodies

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Default route
app.get('/', (req, res) => {
    res.send('Welcome to the Events API!'); // Response for root URL
});

// Use the event routes
app.use('/events', eventRoutes); // Ensure this matches your routes

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
