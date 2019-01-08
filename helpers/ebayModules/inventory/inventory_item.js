var request = require('request');
var configIt = require("../../../config/config.js");
var Validator = require('jsonschema').Validator;

class inventory_item {
    constructor(authToken) {
        this.state = {
            authToken: authToken,
            config: new configIt()
        }
    }

    getInventoryItems(callback) {
        var options = {
            url: this.state.config.ebayVars.baseUrl + "sell/inventory/v1/inventory_item",
            method: "get",
            headers: {
                'Authorization': 'Bearer ' + this.state.authToken
            }
        };

        request.get(options, function(err, res, body) {
            callback(body);
        })
    }

    getInventoryItem(sku, callback) {
        var options = {
            url: this.state.config.ebayVars.baseUrl + "sell/inventory/v1/inventory_item/" + sku,
            method: "get",
            headers: {
                'Authorization': 'Bearer ' + this.state.authToken
            }
        };

        request.get(options, function(err, res, body) {
            callback(body);
        })
    }

    /**
     * Create an item or update an existing item if it already exists
     * @constructor
     * @param {object} item -           JSON object with specifics on object to be listed.
     *                                  TODO: Need to add more fields and set required fields.
     * @param {function} callback -     Function to be executed upon completion.
     *                                  Currently returning body of response.
     *                                  TODO: Format data sent to response. Set up error response.
     */
    createOrReplaceInventoryItem(item, callback) {
        let v = new Validator();
        let schema = require('../InventoryItem-Schema');
        v.addSchema(schema, '/InventoryItem');

        let options = {
            url: this.state.config.ebayVars.baseUrl + "sell/inventory/v1/inventory_item/" + item.sku,
            method: "PUT",
            headers: {
                'Authorization': 'Bearer ' + this.state.authToken,
                'Content-Language': 'en-US',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item)
        };

        request.put(options, function(err, res, body) {
            callback(body);
        })
    }

    deleteInventoryItem(sku, callback) {
        var options = {
            url: this.state.config.ebayVars.baseUrl + "sell/inventory/v1/inventory_item/" + sku,
            headers: {
                'Authorization': 'Bearer ' + this.state.authToken,
                'Content-Language': 'en-US',
                'Content-Type': 'application/json'
            }
        };
        request.delete(options, function(err, res, body) {
            if(err) console.log(err);
            console.log(body);
            callback(body);
        })
    }
}

module.exports = inventory_item;