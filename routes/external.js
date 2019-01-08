var express = require('express');
var path = require('path');
var app = express.Router();
var request = require('request');
var ebay = require('../helpers/ebay.js');
var isLoggedIn = require('../helpers/isLoggedIn');
var configIt = require('../config/config');
var mongoose = require('mongoose');
var User = require('../models/user.js');
var Validator = require('jsonschema').Validator;

app.post('/getPolicies', function(req, res) {
    const authToken = req.user.ebay.token;

    let Ebay = new ebay(authToken);

    Ebay.Account.getPolicies(function(policies) {
        console.log(policies);
        res.json(JSON.stringify(policies));
    })
});

app.post('/getEbayItems', isLoggedIn, function(req, res) {
    if(req.user.ebay.token) {
        console.log(req.user.ebay.token + "wtf");
        let Ebay = new ebay(req.user.ebay.token);
        Ebay.Inventory.inventory_item.getInventoryItems(function(response) {
            res.json(response);
        });
    } else {
        console.log(req.user);
    }
});

app.post('/addEbayItem', function(req,res) {
    if(req.body && req.body.item) {
        let authToken = req.user.ebay.token;
        let Ebay = new ebay(authToken);
        Ebay.Inventory.inventory_item.createOrReplaceInventoryItem(req.body.item, function(response) {
            console.log(response);
            res.json(response);
        });
    } else {
        console.log(req.body);
    }
});

app.post('/deleteEbayItem', function(req, res) {
    if(req.body && req.body.sku && req.body.uid && req.body.et) {
        let authToken = req.body.et;
        let Ebay = new ebay(authToken);
        console.log(req.body.sku);
        Ebay.Inventory.inventory_item.deleteInventoryItem(req.body.sku, function(response) {
            res.json(response);
        });
    } else {
        console.log(req.body);
    }
})

app.post('/ebay-login-redirect', function(req, res) {
    var config = new configIt();
    var reqBody = req.body;

    var authCode = encodeURI(reqBody.code);
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

    request.post(options, function(err, res2, body) {
        body = JSON.parse(body);
        var token = body.access_token;

        console.log(req.user.local.email);

        var query = {'local.email': req.user.local.email};
        var update = { 'ebay.token': token};
        User.findOneAndUpdate(query, update, function(err, doc){
            //if (err) return res.send(500, { error: err });
            //return res.send("succesfully saved");
            if(err) console.log(err);
            console.log(doc);
        });

        console.log(req.user);

        //res.json(JSON.stringify({status: 'success'}));
    })
});

module.exports = app;