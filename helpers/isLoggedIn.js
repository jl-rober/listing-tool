

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();


    res.json({loggedIn: 'false'});
}

module.exports = isLoggedIn;