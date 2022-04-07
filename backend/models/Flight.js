const mongoose = require('mongoose');

const FlightSchema = new mongoose.Schema({
    departure_airport: String,
    destination_airport: String,
    date: Date,
    price_euro: Number,
    seats_taken: [String]
});

const Flight = new mongoose.model('FlightSchema', FlightSchema);

module.exports = Flight;