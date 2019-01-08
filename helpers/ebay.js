const inventory = require('./ebayModules/inventory/Inventory.js');
const Account = require('./ebayModules/account/Account');

class ebay {
    constructor(authToken) {
        this.Inventory = new inventory(authToken);
        this.Account = new Account(authToken);
    }
}

module.exports = ebay;