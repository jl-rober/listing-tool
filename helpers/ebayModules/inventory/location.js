var request = require('request');
var configIt = require("../../../config/config.js");

class location {
    constructor(authToken) {
        this.state = {
            authToken: authToken,
            config: new configIt()
        }
    }



    /**
     * Use this call to create a new inventory location. In order to create and publish an offer (and create an eBay listing), a seller must have at least one inventory location, as every offer must be associated with a location.
     * @constructor
     * @param {object} merchantLocationKey - A unique, immutable merchant-defined key (ID) for an inventory location. This unique identifier, or key, is used in other Inventory API calls to identify an inventory location.
     * @param {function} callback - Function to be executed upon completion. Currently returning body of response.
     */
    createInventoryLocation(merchantLocationKey, data, callback) {
        const requiredFields = ['postalCode', 'name'];

        let missingFields = [];

        for(let field in requiredFields) {
            let match = false;
            if(!data.hasOwnProperty(field)) {
                missingFields.push(field);
            }
        }

        let body = { /* InventoryLocationFull */
            "location" :
                { /* LocationDetails */
                    "address" :
                        { /* Address */
                            "country" : "US",
                            "postalCode" : data.postalCode,
                        }
                },
            "name" : data.name
        };

        let options = {
            url: this.state.config.ebayVars.baseUrl + "sell/inventory/v1/location/" + merchantLocationKey,
            method: "POST",
            headers: {
                'Authorization': 'Bearer ' + this.state.authToken,
                'Content-Type': 'application/json'
            },
            body: body
        };

        request.post(options, function(err, res, body) {
            callback(body);
        })
    }



    /**
     * This call deletes the inventory location that is specified in the merchantLocationKey path parameter. Note that deleting a location will not affect any active eBay listings associated with the deleted location, but the seller will not be able modify the offers associated with the inventory location once it is deleted.
     * @constructor
     * @param {object} merchantLocationKey - A unique, immutable merchant-defined key (ID) for an inventory location. This unique identifier, or key, is used in other Inventory API calls to identify an inventory location.
     * @param {function} callback - Function to be executed upon completion. Currently returning body of response.
     */
    deleteInventoryLocation(merchantLocationKey, callback) {
        let options = {
            url: this.state.config.ebayVars.baseUrl + "sell/inventory/v1/location/" + merchantLocationKey,
            method: "DELETE",
            headers: {
                'Authorization': 'Bearer ' + this.state.authToken
            }
        };

        request.delete(options, function(err, res, body) {
            callback(body);
        })
    }



    /**
     * This call retrieves all defined details of the inventory location that is specified by the merchantLocationKey path parameter.
     * @constructor
     * @param {object} merchantLocationKey - A unique, immutable merchant-defined key (ID) for an inventory location. This unique identifier, or key, is used in other Inventory API calls to identify an inventory location.
     * @param {function} callback - Function to be executed upon completion. Currently returning body of response.
     */
    getInventoryLocation(merchantLocationKey, callback) {
        let options = {
            url: this.state.config.ebayVars.baseUrl + "sell/inventory/v1/location/" + merchantLocationKey,
            method: "GET",
            headers: {
                'Authorization': 'Bearer ' + this.state.authToken,
                'Content-Type': 'application/json'
            }
        };

        request.delete(options, function(err, res, body) {
            callback(body);
        })
    }



    /**
     * This call retrieves all defined details of the inventory location that is specified by the merchantLocationKey path parameter.
     * @constructor
     * @param {object} merchantLocationKey - A unique, immutable merchant-defined key (ID) for an inventory location. This unique identifier, or key, is used in other Inventory API calls to identify an inventory location.
     * @param {function} callback - Function to be executed upon completion. Currently returning body of response.
     */
    getInventoryLocation(merchantLocationKey, callback) {
        let options = {
            url: this.state.config.ebayVars.baseUrl + "sell/inventory/v1/location/" + merchantLocationKey,
            method: "GET",
            headers: {
                'Authorization': 'Bearer ' + this.state.authToken
            }
        };

        request.delete(options, function(err, res, body) {
            callback(body);
        })
    }



    /**
     * This call retrieves all defined details of the inventory location that is specified by the merchantLocationKey path parameter.
     * @constructor
     * @param {object} limitOffset - The value passed in this query parameter sets the maximum number of records to return per page of data. Although this field is a string, the value passed in this field should be a positive integer value. If this query parameter is not set, up to 100 records will be returned on each page of results.
     * @param {function} callback - Function to be executed upon completion. Currently returning body of response.
     */
    getInventoryLocations(limitOffset, callback) {
        let url = this.state.config.ebayVars.baseUrl + "sell/inventory/v1/location/";
        if(limitOffset) {
            if(limitOffset.offset) {
                url += "?offset=" + limitOffset.offset;
                if(limitOffset.limit !== null) {
                    url += "&limit=" + limitOffset.limit;
                }
            } else if(limitOffset.limit !== null) {
                url += "?limit" + limitOffset.limit;
            }
        }

        let options = {
            url: url,
            method: "GET",
            headers: {
                'Authorization': 'Bearer ' + this.state.authToken
            }
        };

        request.delete(options, function(err, res, body) {
            callback(body);
        })
    }



    /**
     * Use this call to update non-physical location details for an existing inventory location. Specify the inventory location you want to update using the merchantLocationKey path parameter.

     You can update the following text-based fields: name, phone, locationWebUrl, locationInstructions and locationAdditionalInformation. Whatever text is passed in for these fields in an updateInventoryLocation call will replace the current text strings defined for these fields. For store inventory locations, the operating hours and/or the special hours can also be updated.

     The merchant location key, the physical location of the store, and its geo-location coordinates can not be updated with an updateInventoryLocation call

     In addition to the authorization header, which is required for all eBay REST API calls, the following table includes another request header that is mandatory for the updateInventoryLocation call, and two other request headers that are optional:
     * @constructor
     * @param {object} merchantLocationKey - A unique, immutable merchant-defined key (ID) for an inventory location. This unique identifier, or key, is used in other Inventory API calls to identify an inventory location.
     * @param {function} callback - Function to be executed upon completion. Currently returning body of response.
     */
    updateInventoryLocation(merchantLocationKey, data, callback) {
        let options = {
            url: this.state.config.ebayVars.baseUrl + "sell/inventory/v1/location/" + merchantLocationKey + "/update_location_details",
            method: "POST",
            headers: {
                'Authorization': 'Bearer ' + this.state.authToken,
                'Content-Type': 'application/json'
            },
        };

        request.delete(options, function(err, res, body) {
            callback(body);
        })
    }


}

module.exports = location;