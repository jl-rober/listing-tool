var request = require('request');
var configIt = require("../../../config/config.js");

class location {
    constructor(authToken) {
        this.state = {
            authToken: authToken,
            config: new configIt()
        }
    }

    createOffer(data, callback) {
        let options = {
            url: this.state.config.ebayVars.baseUrl + "sell/inventory/v1/offer",
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

    updateOffer(data, callback) {
        let options = {
            url: this.state.config.ebayVars.baseUrl + "sell/inventory/v1/offer/" + data.offerId,
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

    getOffers(data, callback) {
        let options = {
            url: this.state.config.ebayVars.baseUrl + "sell/inventory/v1/offer/" + data.sku,
            method: "GET",
            headers: {
                'Authorization': 'Bearer ' + this.state.authToken,
                'Content-Language': 'en-US',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };

        request.get(options, function(err, res, body) {
            callback(body);
        })

    }

    getOffer(data, callback) {
        let options = {
            url: this.state.config.ebayVars.baseUrl + "sell/inventory/v1/offer/" + data.offerId,
            method: "GET",
            headers: {
                'Authorization': 'Bearer ' + this.state.authToken,
                'Content-Language': 'en-US',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };

        request.get(options, function(err, res, body) {
            callback(body);
        })

    }

    deleteOffer(data, callback) {
        let options = {
            url: this.state.config.ebayVars.baseUrl + "sell/inventory/v1/offer/" + data.offerId,
            method: "DELETE",
            headers: {
                'Authorization': 'Bearer ' + this.state.authToken,
                'Content-Language': 'en-US',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };

        request.delete(options, function(err, res, body) {
            callback(body);
        })
    }

    publishOffer(data, callback) {
        let options = {
            url: this.state.config.ebayVars.baseUrl + "sell/inventory/v1/offer/" + data.offerId + "/publish/",
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

    getListingFees(data, callback) {
        let options = {
            url: this.state.config.ebayVars.baseUrl + "sell/inventory/v1/offer/get_listing_fees",
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

    widthdrawOffer() {
        let options = {
            url: this.state.config.ebayVars.baseUrl + "sell/inventory/v1/offer/" + data.offerId + "/withdraw/",
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
}

module.exports = location;