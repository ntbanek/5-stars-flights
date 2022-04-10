const mongoose = require('mongoose');

const ReservationSchema = new mongoose.Schema({
    user: String,
    flight_id: String,
    seats: [String],
    luggage: String
});

const Reservation = new mongoose.model('ReservationSchema', ReservationSchema);

module.exports = Reservation;