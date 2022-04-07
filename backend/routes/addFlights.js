const mongoose = require('mongoose');
const Flight = require('./../models/Flight')


const connectionString = "mongodb+srv://kato:kato@cluster0.hxqoi.mongodb.net/projektWSB?retryWrites=true&w=majority";

function getRandomDate() {
    let from = new Date();
    let to = new Date(2023, 0, 1);
    from = from.getTime();
    to = to.getTime();
    return new Date(from + Math.random() * (to - from));
}

function getRandomInt() {
    let min = 40;
    let max = 1000;
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function getTakenSeatsRandomly() {
    let taken_places = [];
    let places_nr = Math.floor(Math.random() * (180 + 1));
    for(let i = 0; i<places_nr; i++)
    {
        const places = ['A', 'B', 'C', 'D', 'E', 'F'];
        let place = Math.floor(Math.random() * (30 - 1 + 1) + 1).toString() + places[Math.floor(Math.random() * (5 + 1))];
        if(!taken_places.includes(place))
        {
            taken_places.push(place);
        }
    }
    return taken_places;
}

function getRandomAirport() {
    const airports = ['Aberdeen', 'Amsterdam', 'Ateny', 'Barcelona', 'Bergen', 'Berlin', 'Birmingham', 'Budapeszt', 'Dublin', 'Frankfurt', 'Glasgow', 'Lizbona', 'Londyn', 'Warszawa', 'Katowice', 'Rzym', 'Paryż', 'Monachium', 'Madryt', 'Amsterdam', 'Bazylea']
    let randomAirport = airports[Math.floor(Math.random() * (airports.length))];
    return randomAirport;
}

function createFlightTable() {
    let flights = [];
    for(let i = 0; i <= 1000; i++)
    {
        let departure = getRandomAirport();
        let destination;
        do {
            destination = getRandomAirport(); 
        } while (departure == destination);
        flights.push({departure_airport: departure, destination_airport: destination, date: getRandomDate(), price_euro: getRandomInt(), seats_taken: getTakenSeatsRandomly()})
    }
    return flights;
}
async function run () {

await mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    return console.log("Połączono z bazą danych");
}, error => console.log(`Błąd ${error}`));

if(Flight.length)
{
    await Flight.collection.drop(); //jeżeli już mamy rekordy, to usuwamy całą kolekcję żeby nie dublować
}

await createFlightTable();

await Flight.create(createFlightTable());

}

run();