const express = require('express');
const mongoose = require('mongoose');
const User = require('./../models/User')
const Flight = require('./../models/Flight');
const { json } = require('express');
const router = express.Router();

const connectionString = "mongodb+srv://kato:kato@cluster0.hxqoi.mongodb.net/projektWSB?retryWrites=true&w=majority";

async function run () {

await mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    return console.log("Połączono z bazą danych");
}, error => console.log(`Błąd ${error}`));

if(User.length)
{
    await User.collection.drop(); //jeżeli już mamy rekordy, to usuwamy całą kolekcję żeby nie dublować
}

await User.create([
    {login: "aaa@aaa.com", password: "aaa", name: "Natalia", lastname: "Banek", age: 32},
    {login: "bbb@bbb.com", password: "bbb", name: "Tomasz", lastname: "Kowalski", age: 23}
])

}

run();

router.get('/', async function(req, res) {
    res.render('index', {
        searchData: '',
        flightData: ''
    })
})

router.get('/signup', async function(req, res) {
    res.render('signup', {

    })
})

router.get('/posts', async function(req,res) {
    const findId = await Character.find(); // pobieramy całą bazę
    // pod tym endpointem będzie nam pobierało wszystkie nasze dane
    await res.json(findId);

})

router.post('/postUserData', async function(req,res) { //req wysyłamy dane!
    const insertDoc = await new User({login: req.body.login, password: req.body.password, name: req.body.name, lastname: req.body.lastname, age: req.body.age})
    console.log(insertDoc)
    await insertDoc.save(function(err, someVal) {
        if(err) {return console.log(err)}
        return console.log(`Zapisano do bazy: ${someVal}`);
    });
    res.redirect("/signup");
})

router.post('/update', async function(req, res) {
    const findId = await Character.find();
    await Character.findByIdAndUpdate({_id: findId[4]._id}, {rank: "generał", age: 100});
    await res.redirect("/");
})

router.post('/deleteChosen', async function(req,res) {
    console.log(req.body.ktoryUsunac);
    const findId = await Character.find();
    await Character.deleteOne({_id: findId[req.body.ktoryUsunac]._id});
    await res.redirect("/");
})

router.get('/getFlightData', async function(req,res) {
    const findId = await Flight.find({departure_airport: req.query.departure, destination_airport: req.query.destination, date: { $gte: req.query.date_from, $lte: req.query.date_to }}); // pobieramy całą bazę
    // pod tym endpointem będzie nam pobierało wszystkie nasze dane
    //await res.json(findId);
    await res.render('index', {
        searchData: req.query,
        flightData: JSON.parse(JSON.stringify(findId))
    })
})

router.get('/flightDetails', async function(req,res) {
    const findId = await Flight.find({_id: req.query.flightId});
    console.log(findId)
    await res.render('flightDetails', {
        passengersNumber: req.query.passengers,
        flightData: JSON.parse(JSON.stringify(findId))
    })
})

module.exports = router;