let callsComplete = 0;
let totalCalls = 4;
let policies = {};
let locations;

function callCompleted(type, info) {
    switch(type) {
        case "fulfillment":
            policies.fulfillment = info.fulfillmentPolicies;
            break;
        case "payment":
            policies.payment = info.paymentPolicies;
            break;
        case "returns":
            policies.returns = info.returnPolicies;
            break;
        case "locations":
            locations = info.locations;
            break;
    }

    callsComplete++;
    if(callsComplete === totalCalls) {
        console.log(locations);
        res.render('profile', {user: req.user, policies: policies, locations: locations})
    }
}

var options1 = {
    url: 'https://api.ebay.com/sell/account/v1/fulfillment_policy/?' +
    'marketplace_id=EBAY_US',
    headers: {
        'Authorization': 'Bearer ' + authToken
    }
};

function callback1(error, response, body) {
    let info = {};
    let data = JSON.parse(body);
    if (!error) {
        if(response.statusCode === 200) {
            if(data.total) {
                info = data;
                console.log("Fulfillment policy retrieved");
            } else if(data.error) {
                console.log(response);
                res.redirect('/');
            } else {
                console.log(body);
                res.redirect('/');
            }
        }  else {
            console.log('Unexpected fulfillment policy response');
            res.redirect('/');
        }
        callCompleted("fulfillment", info);
    }
    if(error) console.log(error);
}

var options2 = {
    url: 'https://api.ebay.com/sell/account/v1/payment_policy/?' +
    'marketplace_id=EBAY_US',
    headers: {
        'Authorization': 'Bearer ' + authToken
    }
};

function callback2(error, response, body) {
    if (!error && response.statusCode == 200) {
        var info = JSON.parse(body);
        console.log("Payment policy retreieved");
        callCompleted("payment", info);
    }
    if(error) console.log(error);
}

var options3 = {
    url: 'https://api.ebay.com/sell/account/v1/return_policy/?' +
    'marketplace_id=EBAY_US',
    headers: {
        'Authorization': 'Bearer ' + authToken
    }
};

function callback3(error, response, body) {
    if (!error && response.statusCode == 200) {
        var info = JSON.parse(body);
        console.log("Return policy retreieved");
        callCompleted("returns", info);
    }
    if(error) console.log(error);
}

var options4 = {
    url: 'https://api.ebay.com/sell/inventory/v1/location/',
    headers: {
        'Authorization': 'Bearer ' + authToken
    }
};

function callback4(error, response, body) {
    if (!error && response.statusCode == 200) {
        var info = JSON.parse(body);
        console.log("Locations retreieved");
        callCompleted("locations", info);
    }
    if(error) console.log(error);
}

request.get(options1, callback1);
request.get(options2, callback2);
request.get(options3, callback3);
request.get(options4, callback4);