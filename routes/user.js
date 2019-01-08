var express = require('express');
var path = require('path');
var app = express.Router();
var isLoggedIn = require('../helpers/isLoggedIn');
var passport = require('passport');
var ebay = require('../helpers/ebay.js');
var request = require('request');



// =====================================
// PROFILE SECTION =====================
// =====================================
// we will want this protected so you have to be logged in to visit
// we will use route middleware to verify this (the isLoggedIn function)
app.get('/profile', isLoggedIn, function(req, res) {
    function ebayCallback(pols) {
        res.render('/frontend/views/profile', {policies: pols, user: req.user});
    }

    let myEbay = new ebay(authToken);
    myEbay.policies.getPolicies(ebayCallback);

    //res.render('profile', {policies: pols, user: req.user});
});



// =====================================
// LOGIN ===============================
// =====================================
// show the login form

// process the login form
// app.post('/login', do all our passport stuff here);
app.post('/login', passport.authenticate('local-login'), function(req, res) {
    res.cookie('isLoggedIn', true);
    res.json(JSON.stringify({loggedIn: true}));
});

app.get('/ebay-success-redirect', function(req, res) {
    var authCode = req.get('code');

    var options = {
        url: "https://api.sandbox.ebay.com/identity/v1/oauth2/token",
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: "Basic JustinRo-ebaytest-SBX-045f6444c-d84abb1e:SBX-45f6444cb545-5cb2-4f08-bd57-5964",
            body: "grant_type=authorization_code&code=" + authCode + "&redirect_uri=Justin_Roberts-JustinRo-ebayte-yrmkpfx"

        }
    }

    request.get(options, function(err, res, body) {
        console.log(body);
    })
});

app.post('/ebay-success-redirect', function(req, res) {
    var authCode = req.get('code');

    var options = {
        url: "https://api.sandbox.ebay.com/identity/v1/oauth2/token",
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: "Basic JustinRo-ebaytest-SBX-045f6444c-d84abb1e:SBX-45f6444cb545-5cb2-4f08-bd57-5964",
            body: "grant_type=authorization_code&code=" + authCode + "&redirect_uri=Justin_Roberts-JustinRo-ebayte-yrmkpfx"

        }
    }

    request.get(options, function(err, res, body) {
        console.log(body);
    })
});

// =====================================
// SIGNUP ==============================
// =====================================
// show the signup form
app.get('/signup', function(req, res) {

    // render the page and pass in any flash data if it exists
    res.render('user/signup.jsx', { message: req.flash('signupMessage') });
});

// process the signup form
// app.post('/signup', do all our passport stuff here);
app.post('/signup', passport.authenticate('local-signup'), function(req, res) {
    res.json(JSON.stringify(req.user));
});



// =====================================
// LOGOUT ==============================
// =====================================
app.get('/logout', function(req, res) {
    console.log('logout called');
    res.clearCookie('sid');
    res.clearCookie('isLoggedIn');
    req.logOut();
    req.session.destroy();
    res.json({});
});

module.exports = app;
