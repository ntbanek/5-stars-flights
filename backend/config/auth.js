module.exports = {
    ensureAuthenticated : function(req,res,next) {
    if(req.isAuthenticated()) {
    return next();
    }
    req.flash('error_msg' , 'Zaloguj się, aby przejść dalej.');
    res.render('index', {
        loginDisplay: 'block',
        user_path: req.originalUrl
    })
    }
    }