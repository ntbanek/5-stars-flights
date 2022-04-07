const express = require('express');
const path = require('path');
const app = express();
const port = 8000;

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.set("views", path.join(__dirname, "./../frontend/views"));
app.set("view engine", "ejs");

app.use("/js", express.static(path.join(__dirname, "./../frontend/js")))
app.use("/assets", express.static(path.join(__dirname, "./../frontend/assets")))

app.use("/", require('./routes/routes'));

app.listen(port, (err) => {
    if (err) {
        return console.log(`Wystąpił błąd ${err}`)
    }
    return console.log(`Aplikacja działa na porcie ${port}`)
})
