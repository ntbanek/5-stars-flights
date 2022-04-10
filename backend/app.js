const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
//const expressEjsLayout = require('express-ejs-layouts')
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
require("./config/passport")(passport)

const app = express();
const port = 8000;

app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

app.set("views", path.join(__dirname, "./../frontend/views"));
app.set("view engine", "ejs");
//app.use(expressEjsLayout);
app.use("/js", express.static(path.join(__dirname, "./../frontend/js")))
app.use("/assets", express.static(path.join(__dirname, "./../frontend/assets")))

//express session
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
//use flash
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
})
app.use("/", require('./routes/routes'));
app.use("/", require('./routes/user'));

const connectionString = "mongodb+srv://kato:kato@cluster0.hxqoi.mongodb.net/projektWSB?retryWrites=true&w=majority";

mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    return console.log("Połączono z bazą danych");
}, error => console.log(`Błąd ${error}`));


app.listen(port, (err) => {
    if (err) {
        return console.log(`Wystąpił błąd ${err}`)
    }
    return console.log(`Aplikacja działa na porcie ${port}`)
})