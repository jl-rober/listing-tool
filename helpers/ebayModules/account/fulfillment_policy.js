var request = require('request');
var configIt = require("../../../config/config.js");

class fulfillment_policy {
    constructor(authToken) {
        this.state = {
            authToken: authToken,
            url: 'sell/account/v1/fulfillment_policy/',
            config: new configIt()
        }
    }

    createFulfillmentPolicy(data, callback) {
        let options = {
            url: this.state.config.ebayVars.baseUrl + this.state.url,
            method: "POST",
            headers: {
                'Authorization': 'Bearer ' + this.state.authToken,
                'Content-Language': 'en-US',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };

        request.post(options, function(err, res, body) {
            callback(body);
        })

    }

    deleteFulfillmentPolicy(data, callback) {
        let options = {
            url: this.state.config.ebayVars.baseUrl + this.state.url + data.fullfillmentPolicyId,
            method: "DELETE",
            headers: {
                'Authorization': 'Bearer ' + this.state.authToken,
                'Content-Language': 'en-US',
                'Content-Type': 'application/json'
            }
        };

        request.delete(options, function(err, res, body) {
            callback(body);
        })

    }

    getFulfillmentPolicies(data, callback) {
        let options = {
            url: this.state.config.ebayVars.baseUrl + this.state.url,
            method: "GET",
            headers: {
                'Authorization': 'Bearer ' + this.state.authToken,
                'Content-Language': 'en-US',
                'Content-Type': 'application/json'
            }
        };

        request.get(options, function(err, res, body) {
            callback(body);
        })

    }

    getFulfillmentPolicy(data, callback) {
        let options = {
            url: this.state.config.ebayVars.baseUrl + this.state.url + data.fulfillmentPolicyId,
            method: "GET",
            headers: {
                'Authorization': 'Bearer ' + this.state.authToken,
                'Content-Language': 'en-US',
                'Content-Type': 'application/json'
            }
        };

        request.get(options, function(err, res, body) {
            callback(body);
        })
    }

    getFulfillmentPolicyByName(data, callback) {
        let options = {
            url: this.state.config.ebayVars.baseUrl + this.state.url + data.name,
            method: "GET",
            headers: {
                'Authorization': 'Bearer ' + this.state.authToken,
                'Content-Language': 'en-US',
                'Content-Type': 'application/json'
            }
        };

        request.get(options, function(err, res, body) {
            callback(body);
        })
    }

    updateFulfillmentPolicy(data, callback) {
        let options = {
            url: this.state.config.ebayVars.baseUrl + this.state.url + "/" + data.fulfillmentPolicyId,
            method: "PUT",
            headers: {
                'Authorization': 'Bearer ' + this.state.authToken,
                'Content-Language': 'en-US',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };

        request.put(options, function(err, res, body) {
            callback(body);
        })
    }

}

module.exports = fulfillment_policy;