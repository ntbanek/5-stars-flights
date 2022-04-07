const seats_arr = seats.split(",");
console.log(seats_arr)

console.log(passengers_number)

Array.from(document.getElementsByTagName('rect')).forEach((el) => {
    el.addEventListener("mouseover", () => showPopup(el));
    el.addEventListener("mouseout", hidePopup);
})

seats_arr.forEach((el) => {
    document.getElementById('seat' + el).style.fill = 'red';
})

function showPopup(element) {
    const popup = document.getElementById("tooltip");
    var iconPos = element.getBoundingClientRect();
    popup.style.left = (iconPos.right + 20) + "px";
    popup.style.top = (window.scrollY + iconPos.top - 60) + "px";
    popup.style.display = "block";
}

function hidePopup() {
    var tooltip = document.getElementById("tooltip");
    tooltip.style.display = "none";
}
