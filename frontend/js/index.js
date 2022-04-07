
const airports = ['Aberdeen', 'Ateny', 'Barcelona', 'Bergen', 'Berlin', 'Birmingham', 'Budapeszt', 'Dublin', 'Frankfurt', 'Glasgow', 'Lizbona', 'Londyn', 'Warszawa', 'Katowice', 'Rzym', 'Paryż', 'Monachium', 'Madryt', 'Amsterdam', 'Bazylea']
airports.sort();
let select_departure = document.getElementById('departure_airport');
let select_destination = document.getElementById('destination_airport');

airports.forEach((el, i) => {
    let opt = document.createElement('option');
    opt.value = el;
    opt.innerText = el;
    select_departure.appendChild(opt);
    var opt2 = opt.cloneNode(true);
    select_destination.appendChild(opt2);
})


document.getElementById('login_btn').addEventListener('click', () => {
    document.getElementById('myForm').style.display = 'block';
})