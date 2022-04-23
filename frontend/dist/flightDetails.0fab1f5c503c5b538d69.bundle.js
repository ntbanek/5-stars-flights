/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
var seats_arr = seats.split(",");
console.log(seats_arr);
console.log(passengers_number);
var reserved_places = [];
var form = document.getElementById("reservation_details");
var flightId = document.createElement("input");
flightId.type = 'hidden';
flightId.name = 'flightId';
flightId.value = flight_id;
form.appendChild(flightId);
Array.from(document.getElementsByTagName('rect')).forEach(function (el) {
  el.addEventListener("mouseover", showPopup);
  el.addEventListener("mouseout", hidePopup);
  el.addEventListener("click", reservePlace);
});
seats_arr.forEach(function (el) {
  document.getElementById('seat' + el).style.fill = 'red';
});

function showPopup() {
  var popup = document.getElementById("tooltip");
  var iconPos = this.getBoundingClientRect();
  popup.style.left = iconPos.right + 20 + "px";
  popup.style.top = window.scrollY + iconPos.top - 60 + "px";
  popup.style.display = "block";
  var place_nr = this.id.substring(4);

  if (this.style.fill == 'red') {
    setTooltipText("Miejsce zajęte", "Niestety miejsce " + place_nr + " jest już zarezerwowane. Znajdź inne miejsce.");
  } else if (this.style.fill == 'green') {
    setTooltipText("Twoje miejsce", "Wybrałeś miejsce " + place_nr + ".");
  } else {
    setTooltipText("Miejsce wolne", "Możesz wybrać miejsce " + place_nr + ".");
  }
}

function hidePopup() {
  var tooltip = document.getElementById("tooltip");
  tooltip.style.display = "none";
}

function reservePlace() {
  if (this.style.fill == 'red') {
    console.log("zajęte!");
  }

  if (this.style.fill == 'grey') {
    this.style.fill = 'white';

    for (var i = 0; i < reserved_places.length; i++) {
      if (reserved_places[i] === this.id) {
        reserved_places.splice(i, 1);
      }
    }

    document.getElementById("chosen_seats").removeChild(document.getElementById(this.id + "_li"));
    document.getElementById("chosen_seats").removeChild(document.getElementById(this.id + "_hidden"));
  } else {
    if (passengers_number > reserved_places.length) {
      console.log('wolne!');
      this.style.fill = 'green';
      reserved_places.push(this.id);
      var seats_list = document.getElementById("chosen_seats");
      var li = document.createElement("li");
      li.id = this.id + "_li";
      li.appendChild(document.createTextNode(this.id));
      seats_list.appendChild(li);
      var hidden_element = document.createElement("input");
      hidden_element.type = 'hidden';
      hidden_element.name = 'seats[]';
      hidden_element.id = this.id + "_hidden";
      hidden_element.value = this.id.substring(4);
      seats_list.appendChild(hidden_element);
      showPopup.call(this); //showPopup();
    } else {
      setTooltipText("Za dużo miejsc!", "Wybrałeś odpowiednią liczbę miejsc. Aby zrezygnować z rezerwacji, kliknij wybrane miejsce ponownie.");
    }
  }
}

function setTooltipText(title, text) {
  document.getElementById("tooltip_title").innerText = title;
  document.getElementById("tooltip_text").innerText = text;
}

function validateForm() {
  if (passengers_number > reserved_places.length) {
    alert("Nie wybrałeś miejsc dla wszystkich pasażerów!");
    return false;
  }

  return true;
}

;
/******/ })()
;