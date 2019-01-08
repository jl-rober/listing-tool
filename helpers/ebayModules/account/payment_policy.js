var request = require('request');
var configIt = require("../../../config/config.js");

class fulfillment_policy {
    constructor(authToken) {
        this.state = {
            authToken: authToken,
            url: 'sell/account/v1/payment_policy/',
            config: new configIt()
        }
    }

    createPaymentPolicy(data, callback) {
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

    deletePaymentPolicy(data, callback) {
        let options = {
            url: this.state.config.ebayVars.baseUrl + this.state.url + data.paymentPolicyId,
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

    getPaymentPolicies(data, callback) {
        let options = {
            url: this.state.config.ebayVars.baseUrl + this.state.url + data.paymentPolicyId,
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

    getPaymentPolicy() {
        let options = {
            url: this.state.config.ebayVars.baseUrl + this.state.url + data.paymentPolicyId,
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

    getPaymentPolicyByName(data, callback) {
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

    updatePaymentPolicy(data, callback) {
        let options = {
            url: this.state.config.ebayVars.baseUrl + this.state.url + "/" + data.paymentPolicyId,
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