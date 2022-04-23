/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
var airports = ['Pekin', 'Dubaj', 'Tokio', 'Los Angeles', 'Londyn', 'Paryż', 'Frankfurt', 'Warszawa', 'Katowice', 'Hongkong'];
airports.sort();
var select_departure = document.getElementById('departure_airport');
var select_destination = document.getElementById('destination_airport');
airports.forEach(function (el, i) {
  var opt = document.createElement('option');
  opt.value = el;
  opt.innerText = el;
  select_departure.appendChild(opt);
  var opt2 = opt.cloneNode(true);
  select_destination.appendChild(opt2);
});
document.getElementById('login_btn').addEventListener('click', function () {
  document.getElementById('myForm').style.display = 'block';
});

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showForecast);
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
}

function showForecast(position) {
  console.log(position.coords.longitude);
  console.log(position.coords.latitude);
  fetch("https://api.openweathermap.org/data/2.5/weather?lat=" + position.coords.latitude + "&lon=" + position.coords.longitude + "&appid=5f2b0d185ada2f13f59299e45c62ca85").then(function (result) {
    return result.json();
  }).then(function (data) {
    console.log(data);
    document.getElementById("weather").innerText = "Pogoda dla miasta: " + data.name + " - temp. odczuwalna: " + (data.main.feels_like - 272.15).toFixed() + "℃, temp.: " + (data.main.temp - 272.15).toFixed() + "℃, wilgotność: " + data.main.humidity + "%, prędkość wiatru: " + data.wind.speed + "km/h";
  });
}

getLocation();
/******/ })()
;