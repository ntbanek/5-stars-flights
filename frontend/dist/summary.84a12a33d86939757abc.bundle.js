/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function showForecast() {
  return _showForecast.apply(this, arguments);
}

function _showForecast() {
  _showForecast = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            fetch("http://api.positionstack.com/v1/forward?access_key=c347fd2a84ccee6daeac647234c8c05e&query=" + destination).then(function (result) {
              return result.json();
            }).then(function (data) {
              console.log(data);
              return fetch("https://api.openweathermap.org/data/2.5/weather?lat=" + data.data[0].latitude + "&lon=" + data.data[0].longitude + "&exclude=hourly,minutely,alerts&appid=5f2b0d185ada2f13f59299e45c62ca85");
            }).then(function (result) {
              return result.json();
            }).then(function (data) {
              console.log(data);
              document.getElementById("weather_dest").innerText = "Aktualna pogoda dla miasta: " + destination + " - temp. odczuwalna: " + (data.main.feels_like - 272.15).toFixed() + "℃, temp.: " + (data.main.temp - 272.15).toFixed() + "℃, wilgotność: " + data.main.humidity + "%, prędkość wiatru: " + data.wind.speed + "km/h";
            });

          case 1:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _showForecast.apply(this, arguments);
}

var flight_date_format = new Date(flight_date);
var date_now = Date.now();
var time_difference = flight_date_format.getTime() - date_now;
var day_difference = time_difference / (1000 * 3600 * 24);

if (day_difference <= 16) {
  showForecast();
}

document.getElementById("currency").addEventListener('change', function () {
  var _this = this;

  fetch("http://api.nbp.pl/api/exchangerates/rates/a/EUR").then(function (res) {
    return res.json();
  }).then(function (data) {
    return price_pln = data.rates[0].mid * sum_price_euro;
  }).then(function (price_pln) {
    if (_this.value == 'PLN') {
      document.getElementById("to_pay").innerText = price_pln.toFixed(2) + " zł";
      return;
    } else if (_this.value == 'USD') {
      fetch("http://api.nbp.pl/api/exchangerates/rates/a/USD").then(function (res) {
        return res.json();
      }).then(function (data) {
        price_usd = price_pln / data.rates[0].mid;
        document.getElementById("to_pay").innerText = price_usd.toFixed(2) + " $";
        return;
      });
    } else {
      document.getElementById("to_pay").innerText = sum_price_euro.toFixed(2) + " €";
    }
  });
});
/******/ })()
;