// models/Event.js
const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    name: { type: String, required: true, minlength: 3, maxlength: 50 },
    location: { type: String, required: true, minlength: 3, maxlength: 100 },
    date: { type: Date, required: true, validate: { validator: v => v > new Date() } },
    description: { type: String, maxlength: 500, default: '' },
});

const Event = mongoose.models.Event || mongoose.model('Event', eventSchema);
module.exports = Event;
