const express = require('express');
const bcrypt = require('bcrypt');
const User = require('./../models/User')
const passport = require('passport');
const router = express.Router();

router.get('/signup', async function (req, res) {
    res.render('signup', {})
})

router.post('/login', async function (req, res, next) {
    passport.authenticate('local', function (err, user, info) {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.render('index', {
                loginDisplay: 'block',
                error: "Niepoprawne dane!"
            });
        }
        req.logIn(user, function (err) {
            if (err) {
                return next(err);
            }
            return res.redirect(req.body.path);
        });
    })(req, res, next);
});

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
})

router.post('/postUserData', async function (req, res) {
    const {
        email,
        password,
        password2,
        name,
        lastname,
        date_of_birth
    } = req.body;
    let errors = [];
    if (!name || !email || !lastname || !date_of_birth || !password || !password2) {
        errors.push({
            msg: "Nie podano wszystkich danych!"
        })
    }

    if (password !== password2) {
        errors.push({
            msg: "Hasła nie zgadzają się!"
        });
    }

    if (password.length < 6) {
        errors.push({
            msg: 'Zbyt krótkie hasło!'
        })
    }
    if (errors.length > 0) {
        res.render('signup', {
            errors: errors,
            email: email,
            password: password,
            password2: password2,
            name: name,
            lastname: lastname,
            date_of_birth: date_of_birth
        })
    } else {

        await User.findOne({
            email: email
        }).exec((err, user) => {
            console.log(user);
            if (user) {
                errors.push({
                    msg: 'Użytkownik o podanym adresie e-mail już istnieje!'
                });
                res.render('signup', {
                    errors: errors,
                    email: email,
                    password: password,
                    password2: password2,
                    name: name,
                    lastname: lastname,
                    date_of_birth: date_of_birth
                })

            } else {
                const newUser = new User({
                    email: email,
                    password: password,
                    name: name,
                    lastname: lastname,
                    date_of_birth: date_of_birth
                });

                bcrypt.genSalt(10, (err, salt) =>
                    bcrypt.hash(newUser.password, salt,
                        (err, hash) => {
                            if (err) throw err;
                            newUser.password = hash;
                            newUser.save()
                                .then((value) => {
                                    res.redirect('/login');
                                })
                                .catch(value => console.log(value));

                        }));
            }

        });
    }
})


module.exports = router;