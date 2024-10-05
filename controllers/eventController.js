console.log('Event Controller Loaded');
const Event = require('../models/Event');
const Joi = require('joi');

const eventSchema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    location: Joi.string().min(3).max(100).required(),
    date: Joi.date().greater('now').required(), // Ensures the date is in the future
    description: Joi.string().max(500).optional(),
});

// Create a new event
exports.createEvent = async (req, res) => {
    // Validate incoming data
    const { error } = eventSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    const { name, location, date, description } = req.body;

    try {
        const event = new Event({ name, location, date, description });
        await event.save();
        res.status(201).json(event);
    } catch (error) {
        console.error('Error creating event:', error);
        res.status(500).json({ message: 'Failed to create event.' });
    }
};

// Get all events
exports.getAllEvents = async (req, res) => {
    try {
        const events = await Event.find();
        res.status(200).json(events);
    } catch (error) {
        console.error('Error fetching events:', error);
        res.status(500).json({ message: error.message });
    }
};

// Get an event by ID
exports.getEventById = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) return res.status(404).json({ message: 'Event not found' });
        res.status(200).json(event);
    } catch (error) {
        console.error('Error fetching event by ID:', error);
        res.status(500).json({ message: 'Failed to fetch event.' });
    }
};

// Update an event by ID
exports.updateEvent = async (req, res) => {
    const { error } = eventSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    try {
        const event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!event) return res.status(404).json({ message: 'Event not found' });
        res.status(200).json(event);
    } catch (error) {
        console.error('Error updating event:', error);
        res.status(500).json({ message: 'Failed to update event.' });
    }
};

// Delete an event by ID
exports.deleteEvent = async (req, res) => {
    try {
        const event = await Event.findByIdAndDelete(req.params.id);
        if (!event) return res.status(404).json({ message: 'Event not found' });
        res.status(204).send();
    } catch (error) {
        console.error('Error deleting event:', error);
        res.status(500).json({ message: 'Failed to delete event.' });
    }
};
