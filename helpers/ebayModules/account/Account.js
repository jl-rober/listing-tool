const fulfillment_policy = require('./fulfillment_policy.js');
const payment_policy = require('./payment_policy');
const return_policy = require('./return_policy');
var request = require('request');
var configIt = require("../../../config/config.js");

class Account {
    constructor(authToken) {
        this.state = { authToken: authToken};
        this.fulfillment_policy = new fulfillment_policy(authToken);
        this.payment_policy = new payment_policy(authToken);
        this.return_policy = new return_policy(authToken);
    }

    getPolicies(callback) {
        const config = new configIt();

        let policies = {};

        const policyTypes = ['fulfillment', 'payment', 'return'];

        let callsComplete = 0;

        let totalCalls = policyTypes.length;

        for (let i = 0; i < policyTypes.length; i++) {
            let ebBaseUrl = config.ebayVars.baseUrl;

            let policyCallback = function (error, response, body) {
                let info = {};
                let data = JSON.parse(body);
                if (!error) {
                    if (response.statusCode === 200) {
                        if (data.total) {
                            console.log(data);
                            info = data;
                        }
                    } else {
                        console.log('Not 200 response code: ' + response.statusCode);
                    }
                    callCompleted(policyTypes[i], info);
                }
                if (error) console.log(error);
            };

            /*
            policyCallbacks.push(policyCallback);
            */

            let policyOption = {
                url: ebBaseUrl + 'sell/account/v1/' + policyTypes[i] + '_policy/?' +
                'marketplace_id=EBAY_US',
                headers: {
                    'Authorization': 'Bearer ' + this.state.authToken
                }
            };

            request.get(policyOption, policyCallback);
        }

        /*
        for (let j = 0; j < policyTypes.length; j++) {
            request.get(policyOptions[j], policyCallbacks[j]);
        }
        */

        /*
           Get LOCATIONS
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
        */

        function callCompleted(type, info) {
            switch (type) {
                case "fulfillment":
                    policies.fulfillment = info.fulfillmentPolicies;
                    break;
                case "payment":
                    policies.payment = info.paymentPolicies;
                    break;
                case "return":
                    policies.return = info.returnPolicies;
                    break;
            }

            callsComplete++;
            if (callsComplete === totalCalls) {
                callback(policies);
            }
        }
    }
}

module.exports = Account;