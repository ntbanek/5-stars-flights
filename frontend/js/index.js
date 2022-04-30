const airports = ['Pekin', 'Dubaj', 'Tokio', 'Los Angeles', 'Londyn', 'Paryż', 'Frankfurt', 'Warszawa', 'Katowice', 'Hongkong']
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


document.getElementById("departure_airport").addEventListener('change', () => {
    document.querySelectorAll("#destination_airport option").forEach(opt => {
        opt.disabled = false;
        if (opt.value == document.getElementById("departure_airport").value) {
            opt.disabled = true;
        }
    });
})

document.getElementById("destination_airport").addEventListener('change', () => {
    document.querySelectorAll("#departure_airport option").forEach(opt => {
        opt.disabled = false;
        if (opt.value == document.getElementById("destination_airport").value) {
            opt.disabled = true;
        }
    });
})


if (document.getElementById('login_btn')) {
    document.getElementById('login_btn').addEventListener('click', () => {
        document.getElementById('login_form').style.display = 'block';
    })
} else {
    document.getElementById('logout_btn').addEventListener('click', () => {
        window.location.href = '/logout';
    })
}

document.getElementById('back_btn').addEventListener('click', () => {
    document.getElementById('login_form').style.display = 'none';
})



document.getElementById('signup_btn').addEventListener('click', () => {
    window.location.href = '/signup';
})


function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showForecast);
    } else {
        console.log("Geolocation is not supported by this browser.");
    }
}

function showForecast(position) {
    fetch("https://api.openweathermap.org/data/2.5/weather?lat=" + position.coords.latitude + "&lon=" + position.coords.longitude + "&appid=5f2b0d185ada2f13f59299e45c62ca85")
        .then(result => result.json())
        .then(data => {
            document.getElementById("weather").innerText = "Pogoda dla miasta: " + data.name + " - temp. odcz.: " + (data.main.feels_like - 272.15).toFixed() + "℃, temp.: " + (data.main.temp - 272.15).toFixed() + "℃, wilgotność: " + (data.main.humidity) + "%, prędkość wiatru: " + data.wind.speed + "km/h"
        });
}

getLocation();