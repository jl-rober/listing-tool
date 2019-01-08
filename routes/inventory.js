var Item = require('../models/item.js');
var express = require('express');
var path = require('path');
var app = express.Router();
var passport = require('passport');
var mongoose = require('mongoose');
var multer  = require('multer');
var isLoggedIn = require('../helpers/isLoggedIn');
var configIt = require('../config/config');
var Validator = require('jsonschema').Validator;

/*
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});

var upload = multer({ storage: storage });
*/

app.get('/test', function(req,res) {
    let instance = {
        "sku2": "12345"
    }

    let v = new Validator();

    var schema = require('../helpers/ebayModules/InventoryItem-Schema');

    v.addSchema(schema, '/InventoryItem');

    console.log(v.validate(instance, schema));
});

app.post('/additem', isLoggedIn, function(req, res) {
    let item = new Item();
    item.brand = req.body.brand;
    item.model = req.body.model;
    item.sku = req.body.sku;
    item.user_id = req.user.user_id;
    item.image_url = req.body.image;
    item.save(function(err) {
        if(err) console.log(err);
    });
    res.json(JSON.stringify({ status: "Item Added" }))
});

app.post('/getitems', isLoggedIn, function(req,res) {
    let query = {user_id: req.user.user_id};
    Item.find(query, function (err, items) {
        res.json({items: items});
    });
});

app.post('/updateitem', isLoggedIn, function(req,res) {
    if(req.body._id) {
        const body = req.body;
        let query = {user_id: req.user.user_id, _id: body._id};
        let update = {
            $set: {
                brand: body.brand,
                sku: body.sku,
                model: body.model,
                image_url: body.image_url,
                ebay: {
                    title: body.title,
                    description: body.description,
                    condition: body.condition,
                    quantity: body.quantity,
                }
            }
        };
        Item.update(query, update, {upsert: true}, function (err, doc) {
            console.log(doc);
            if (err) throw err;
            res.json(JSON.stringify({ status: "Item Updated" }));
        });
    } else {
        const body = req.body;
        let item = new Item();
        item.brand = body.brand;
        item.sku = body.sku;
        item.model = body.model;
        item.ebay.title = body.title;
        item.ebay.description = body.description;
        item.ebay.condition = body.condition;
        item.ebay.quantity = body.quantity;
        item.user_id = body.uid;
        item.image_url = body.image_url;
        item.save(function(err) {
            if(err) console.log(err);
        });
        res.json(JSON.stringify({ status: "Item Added" }));
    }
});

app.post('/deleteItem', function(req,res) {
    console.log("_Id: " + req.body._id + " uid: " + req.user.user_id);
    Item.find().remove({_id: req.body._id, user_id: req.user.user_id}, function(err, we) {
        if(err) {
            console.log(err);
            res.json({status: 'error removing item'});
        } else {
            //console.log(we)
            res.json({status: 'item removed'});
        }
    });
});

module.exports = app;
