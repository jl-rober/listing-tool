const inventory_item = require('./inventory_item.js');
const location = require('./location.js');
const offer = require('./offer.js');

class inventory {
    constructor(authToken) {
        this.inventory_item = new inventory_item(authToken);
        this.location = new location(authToken);
        this.offer = new offer(authToken);
    }
}

module.exports = inventory;