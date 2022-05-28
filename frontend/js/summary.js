async function showForecast() {

    fetch("https://api.positionstack.com/v1/forward?access_key=c347fd2a84ccee6daeac647234c8c05e&query=" + destination)
        .then(result => result.json())
        .then(data => fetch("https://api.openweathermap.org/data/2.5/weather?lat=" + data.data[0].latitude + "&lon=" + data.data[0].longitude + "&exclude=hourly,minutely,alerts&appid=5f2b0d185ada2f13f59299e45c62ca85"))
        .then(result => result.json())
        .then(data => {
            document.getElementById("weather_dest").innerText = "Aktualna pogoda dla miasta: " + destination + " - temp. odczuwalna: " + (data.main.feels_like - 272.15).toFixed() + "℃, temp.: " + (data.main.temp - 272.15).toFixed() + "℃, wilgotność: " + (data.main.humidity) + "%, prędkość wiatru: " + data.wind.speed + "km/h"
        });
}

const flight_date_format = new Date(flight_date);
const date_now = Date.now();

const time_difference = flight_date_format.getTime() - date_now;
const day_difference = time_difference / (1000 * 3600 * 24);

if (day_difference <= 16) {
    showForecast();
}

document.getElementById("currency").addEventListener('change', function () {
    fetch("https://api.nbp.pl/api/exchangerates/rates/a/EUR")
        .then(res => res.json())
        .then(data => price_pln = data.rates[0].mid * sum_price_euro)
        .then(price_pln => {
            if (this.value == 'PLN') {
                document.getElementById("to_pay").innerText = price_pln.toFixed(2) + " zł";
                return;
            } else if (this.value == 'USD') {
                fetch("https://api.nbp.pl/api/exchangerates/rates/a/USD")
                    .then(res => res.json())
                    .then(data => {
                        price_usd = price_pln / data.rates[0].mid;
                        document.getElementById("to_pay").innerText = price_usd.toFixed(2) + " $";
                        return;
                    })
            } else {
                document.getElementById("to_pay").innerText = sum_price_euro.toFixed(2) + " €";
            }
        })

});