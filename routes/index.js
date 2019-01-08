var express = require('express');
var path = require('path');
var app = express.Router();
var passport = require('passport');
var mongoose = require('mongoose');
var multer  = require('multer');
var isLoggedIn = require('../helpers/isLoggedIn');
var request = require('request');
var configThisShit = require('../config/config');



/* GET home page. */
app.get('/', function(req, res, next) {
    res.redirect('http://localhost/index.js');
});

/*
app.get('/ebay-success-redirect', function(req, res) {
    var config = new configThisShit();

    var authCode = encodeURI(req.query.code);

    var client = config.ebayVars.clientId + ":" + config.ebayVars.clientSecret;

    var buff = new Buffer(client);

    var b64Client = buff.toString('base64');

    var body = "grant_type=authorization_code&code=" + authCode + "&redirect_uri=" + config.ebayVars.redirectUri;

    var options = {
        url: config.ebayVars.baseUrl + "identity/v1/oauth2/token",
        method: "POST",
        headers: {
            'Content-Type': "application/x-www-form-urlencoded",
            Authorization: "Basic " + b64Client

        },
        body: body
    };

    request.post(options, function(err, res, body) {
        console.log(body);
        body = JSON.parse(body);
        var token = body.access_token;
        console.log(token);
    })
});
*/

app.post('/login', passport.authenticate('local-login'), function(req,res) {
    res.json(req.user);
});

app.get('/checkAuth', isLoggedIn, function(req, res) {
    res.json(JSON.stringify({loggedIn: true}));
});

app.get('/isLoggedIn', isLoggedIn, function(req, res) {
    res.send({loggedIn: 'true'});
});

module.exports = app;




