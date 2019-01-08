var express = require('express');
var path = require('path');
var app = express.Router();
var passport = require('passport');
var mongoose = require('mongoose');
var Item = require('../models/item.js');
var multer  = require('multer');
var request = require('request');
var ebay = require('../helpers/ebay.js');

const authToken = "v^1.1#i^1#f^0#I^3#p^3#r^0#t^H4sIAAAAAAAAAOVXW2wUVRjuXtqKUI2hUCAIy1BiQjO7Z3YuuzPpbrK0JSxpoXS3qG2QzM45UwZmZ9Y5Z1vWoKnVoqhBEpGoIQSMl0CUiwaDPuCjPgDhwQtoIEYUMAZiNJEoSDyzvbAtcmnLQxObTZo557993//9Z+aA3oopizcv23ylylPp3d0Ler0eDzcVTKkor3vA551TXgZKDDy7e2t7/X2+i/VYzZo5pQ3hnG1hFNiYNS2sFBdjTN6xFFvFBlYsNYuwQjQllWhpVsJBoOQcm9iabTKBZGOM0fgwgigKYFSSdElX6ao1FDNtx5gwlCVBy2iykJH1MHT3Mc6jpIWJahG6D7goC0SWB2kgKBygv2CUFzuYwGrkYMO2qEkQMPFiuUrR1ymp9falqhgjh9AgTDyZWJpamUg2Nq1I14dKYsUHeUgRleTxyKcGG6LAatXMo9unwUVrJZXXNIQxE4oPZBgZVEkMFTOO8otU80iMRlFE5HUhEhE5eE+oXGo7WZXcvg53xYCsXjRVkEUMUrgTo5SNzHqkkcGnFTREsjHg/luVV01DN5ATY5qWJB5vTzW1MYFUa6tjdxsQQRdpmAeSIAhAZuKaYxCCnA0I5ZATHkw0EG2Q5lGZGmwLGi5pOLDCJksQrRqN5gaUcEONVlornYRO3IpK7aRhDvkOt6kDXcyTdZbbV5SlRASKj3fuwJAkbojgXokiAjICz4WhHo1quhYWbxKFO+vjEEbc7U2itTXk1oIyaoHNqrQLJGeqGmI1Sm8+ixwDKryoh/mojlgoyToryLrOZkQosZyOEEAoQ0c/+n/SByGOkckTNKyR0RtFkDEmpdk51GqbhlZgRpsUz5xBRWzEMWYdITklFOrp6Qn28EHb6QqFAeBCj7U0p7R1KEsP1SFb487GrFHUhoaoFzYUUsjRajZS6dHkVhcT5x3YqjqkkEKmSReGhDuitvjo1VuAxC7IyQXP9cc0gJozgq6ug5qdDdkqnWN3aW2x4sDdGIUwJSg4MBU0ctBBKrQtszAe5zH4GFY3FZXtFP4joTvrdx9gDElVTbPzFhkPxkHXMXjoeVM3TNOdnfEkLHEfS5mWahaIoeHhlBMSfiKXS8LJJfzleUyl1mazLhEEYcK2tjWyEUHU3bNUYznIyaIocxPC3dJlTDLYHB+JSEDm6esCRCeErRF1T6Ke+vu8HUWAIKNxAh+WWfqmhawQFSVWRSjCQsDTl5UK+QzUJ4S7wTToLKULk+0kX2ZjguDEoNFPqckFyp3JoZGEchiymiiFWUHSIStr4Qir6fJdQw7d8ovkpo/R0MjbYLys+Mf1eQ6DPs8heqEEIbCIWwgWVPja/b5pc7BBUNBQ9SA2uix6yXFQcAMq5FTD8VZ4Ouce3Lu25P65ew2YNXwDneLjppZcR8HcGzvl3IM1VVwUiDwAAgc40AEW3tj1czP91d8HXo617Aj84PVt39x+4qejJ7bjw6Bq2MjjKS/z93nKZvjXV9cJW+safiyb8cSu+xrPbpt+ZV5NZd+xzt87uZq2OdcrZy08UPH+F0n+53P7F83ft+Wpk1NPg+VfH9HmHehOtd9ffZIcPeh8Z16pjMM66JStkV5qPrQ1Oq0zvTitv9O017fzH//VL9uOn+n/e9NX+Gzy6dl/MPz5F5hffpPUTz7+tf2t+lPapnc9q8TqBejSJW71oh1rp714vnnP9cpd+2cef/S1N/uvPXzhlG/5q5XPZS7PCq16KJI49t6HC+YZf2579qp88G1B3n5mD+z/9JGaWnL6SVz1+oVvz03fFnjl8jepa559Ww5/0Pj5G2fq1PTWQpn0zPVXPquf/1HfCW9/7ezaIxd3/iU9P9C+fwHVOUbXGRAAAA==";
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

var upload = multer({ storage: storage })

/* GET home page. */
app.get('/', function(req, res, next) {
    res.render('index');
});

// =====================================
// LOGIN ===============================
// =====================================
// show the login form
app.get('/login', function(req, res) {

    // render the page and pass in any flash data if it exists
    res.render('user/login.jsx', { message: req.flash('loginMessage') });
});

// process the login form
// app.post('/login', do all our passport stuff here);
app.post('/login', passport.authenticate('local-login', {
    successRedirect : '/profile', // redirect to the secure profile section
    failureRedirect : '/login', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
}));

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
app.post('/signup', passport.authenticate('local-signup', {
    successRedirect : '/profile', // redirect to the secure profile section
    failureRedirect : '/signup', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
}));

// =====================================
// PROFILE SECTION =====================
// =====================================
// we will want this protected so you have to be logged in to visit
// we will use route middleware to verify this (the isLoggedIn function)
app.get('/profile', isLoggedIn, function(req, res) {
    function ebayCallback(pols) {
        res.render('profile', {policies: pols, user: req.user});
    }
    let ebay = new ebay(authToken);
    ebay.getPolicies(ebayCallback);
});

// =====================================
// LOGOUT ==============================
// =====================================
app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

app.post('/additem', isLoggedIn, upload.single('picture'), function(req, res) {
    let item = new Item();
    item.brand = req.body.brand;
    item.model = req.body.model;
    item.sku = req.body.sku;
    item.user_id = req.user.id;
    item.image_name = req.file.originalname;
    item.image_id = req.file.filename;
    item.image_url = "/images/" + item.image_id;
    item.save(function(err) {
        if(err) console.log(err);
    });
    res.redirect('/getitems');
});

app.get('/getitems', isLoggedIn, function(req,res) {
    let query = {user_id: req.user.id};
    let fromDb = true;
    if(req.query.f) {
        switch(req.query.f) {
            case 'b':
                query.brand = req.query.b;
                break;
            case 'm':
                query.model = req.query.m;
                break;
            case 'e':
                fromDb = false;
                break;
        }
    }
    if(fromDb === true) {
        Item.distinct('brand', function (err, brands) {
            Item.find(query, function (err, items) {
                res.render('inventory', {items: items, brands: brands});
            });
        });
    } else {
        let options = {
            url: "https://api.ebay.com/sell/inventory/v1/inventory_item?limit=100",
            headers: {
                'Authorization': 'Bearer ' + authToken
            }
        };

        function callback(error, response, body) {
            if (!error) {
                let items = [];
                let rawItems = JSON.parse(body);
                rawItems = rawItems.inventoryItems;
                console.log(rawItems);
                if(rawItems === undefined) {

                } else {
                    rawItems.map(function (itemData, i) {
                        let item = {};
                        item.brand = itemData.product.brand;
                        item.model = itemData.product.mpn;
                        item.sku = itemData.sku;
                        item.user_id = req.user.id;
                        item.ebay = {};
                        item.ebay.condition = itemData.condition;
                        item.ebay.title = itemData.product.title;
                        item.ebay.description = itemData.product.description;
                        item.image_url = itemData.product.imageUrls[0];
                        item.ebay.quantity = itemData.availability.shipToLocationAvailability.quantity;
                        items.push(item);
                    });
                }
                res.render('inventory', {items: items});
            }
            if(error) console.log(error);
        }
        request.get(options, callback);
    }
});

app.post('/updateitem', isLoggedIn, function(req,res) {
    function bundleItem() {

    }
    console.log("update item called");
    if(req.body.item_id) {
        let query = {user_id: req.user.id, _id: req.body.item_id};
        let update = {
            $set: {
                brand: req.body.brand,
                sku: req.body.sku,
                model: req.body.model,
                ebay: {
                    title: req.body.title,
                    description: req.body.description,
                    condition: req.body.condition,
                    quantity: req.body.quantity
                }
            }
        };
        Item.update(query, update, {upsert: true}, function (err, doc) {
            console.log(doc);
            if (err) throw err;
            res.redirect('/getitems');
        });
    } else {
        let item = new Item();
        item.brand = req.body.brand;
        item.sku = req.body.sku;
        item.model = req.body.model;
        item.ebay.title = req.body.title;
        item.ebay.description = req.body.description;
        item.ebay.condition = req.body.condition;
        item.ebay.quantity = req.body.quantity;
        item.user_id = req.user.id;
        item.save(function(err) {
            if(err) console.log(err);
        });
        res.redirect('/getitems?f=e')
    }
});

app.post('/listtoebay', isLoggedIn, function(req, res) {
    console.log("list to ebay called");
    let item = req.body;
    let body = JSON.stringify({
        "availability": {
            "shipToLocationAvailability": {
                "quantity": parseInt(req.body.quantity)
            }
        },
        "condition": req.body.condition.toUpperCase(),
        "product": {
            "title": req.body.title,
            "description": req.body.description,
            "brand": req.body.brand,
            "mpn": "CHDHX-401",
            "imageUrls": [
                "http://kb4images.com/images/random-image/37670495-random-image.jpg"
            ]
        }
    });

    var options = {
        url: 'https://api.ebay.com/sell/inventory/v1/inventory_item/' + item.sku,
        headers: {
            'Authorization': 'Bearer ' + authToken,
            'Content-Language': 'en-US',
            'Content-Type': 'application/json'
        },
        body: body
    };

    function callback(error, response, body) {
        if (!error) {
            res.redirect('/getitems');
        }
        if(error) console.log(error);
    }

    request.put(options, callback);
});



app.get('/remove', isLoggedIn, function(req,res) {
    Item.find({model: req.query.model}).remove(function(err) {
        if(err) console.log(err);
        res.redirect('/getitems');
    });
});

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}

module.exports = app;
