const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');

// Define the root route
router.get('/', (req, res) => {
    res.send('Welcome to the Events API!'); // Or any message you'd like to show
});

// Your existing routes
router.get('/events', eventController.getAllEvents);
router.post('/', eventController.createEvent);
router.get('/events/:id', eventController.getEventById);
router.put('/events/:id', eventController.updateEvent);
router.delete('/events/:id', eventController.deleteEvent);

module.exports = router;
