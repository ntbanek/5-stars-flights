const express = require('express');
const Flight = require('./../models/Flight');
const Reservation = require('./../models/Reservation')
const {
    ensureAuthenticated
} = require("../config/auth.js")
const router = express.Router();


router.get('/', async function (req, res) {
    res.render('index', {
        loginDisplay: 'none'
    })
})


router.get('/login', (req, res) => {
    res.render('index', {
        loginDisplay: 'none'
    })
})


router.get('/getFlightData', async function (req, res) {
    const findings = await Flight.find({
        departure_airport: req.query.departure,
        destination_airport: req.query.destination,
        date: {
            $gte: req.query.date_from,
            $lte: req.query.date_to
        }
    });
    let flights_list = JSON.parse(JSON.stringify(findings));

    function sort_data(a, b) {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
    }

    flights_list.sort(sort_data);

    await res.render('index', {
        loginDisplay: 'none',
        searchData: req.query,
        flightData: flights_list
    })
})

router.get('/flightDetails', ensureAuthenticated, async function (req, res) {
    const findings = await Flight.findOne({
        _id: req.query.flightId
    });
    await res.render('flightDetails', {
        passengersNumber: req.query.passengers,
        flightData: JSON.parse(JSON.stringify(findings))
    })
})

router.post('/reserve', async function (req, res) {
    const findings = await Flight.findOne({
        _id: req.body.flightId
    });
    const newReservation = new Reservation({
        user: req.user.email,
        flight_id: req.body.flightId,
        seats:  req.body.seats,
        luggage: req.body.luggage
    });
    await newReservation.save();
    await findings.seats_taken.push(...req.body.seats);
    await findings.save();
    res.render('summary', {
        flightData: JSON.parse(JSON.stringify(findings)),
        user: req.user,
        chosen_seats: req.body.seats,
        luggage: req.body.luggage
    })
})

//tylko do testów: USUNĄĆ POTEM!!!
router.get('/reserve', async function (req, res) {
    res.render('summary', {
        flightData: {     
            departure_airport: "Warszawa",
            destination_airport: "Rzym",
            date: '2022-07-08',
            price_euro: 120,
            seats_taken: ['1B'] },
        user: {
            email: 'aaa@aaa.pl',
            name: "natalia",
            lastname: "august"
        },
        chosen_seats: ['1C'],
        luggage: 'Podręczny'
    })
})


module.exports = router;