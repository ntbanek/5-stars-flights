const express = require('express');
const bcrypt = require('bcrypt');
const User = require('./../models/User')
const passport = require('passport');
const router = express.Router();

router.get('/signup', async function (req, res) {
    res.render('signup', {

    })
})

router.post('/login', async function (req, res, next) {
    passport.authenticate('local', {
        successRedirect: req.body.path,
        failureRedirect: '/signup',
        failureFlash: true,
    })(req, res, next);
})

router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', 'Now logged out');
    res.redirect('/');
})


router.post('/postUserData', async function (req, res) { //req wysyłamy dane!
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

    //check if password is more than 6 characters
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
        //validation passed
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

                //const insertDoc = await new User({login: req.body.login, password: req.body.password, name: req.body.name, lastname: req.body.lastname, age: req.body.age})
                // console.log(insertDoc)
                bcrypt.genSalt(10, (err, salt) =>
                    bcrypt.hash(newUser.password, salt,
                        (err, hash) => {
                            if (err) throw err;
                            //save pass to hash
                            newUser.password = hash;
                            //save user
                            newUser.save()
                                .then((value) => {
                                    console.log(value)
                                    req.flash('success_msg', 'You have now registered!')
                                    res.redirect('/login');
                                })
                                .catch(value => console.log(value));

                        }));
            }

        });
    }
})


module.exports = router;