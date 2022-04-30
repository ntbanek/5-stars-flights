module.exports = {
    ensureAuthenticated : function(req,res,next) {
    if(req.isAuthenticated()) {
    return next();
    }
    res.render('index', {
        loginDisplay: 'block',
        user_path: req.originalUrl
    })
    }
    } 