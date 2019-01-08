// app/models/item.js
// load the things we need
var mongoose = require('mongoose');

// define the schema for our user model
var itemSchema = mongoose.Schema({

    brand: String,
    model: String,
    sku: String,
    user_id: String,
    image_name: String,
    image_id: String,
    image_url: String,
    ebay: {
        title: String,
        description: String,
        condition: String,
        quantity: String
    }

});

// create the model for users and expose it to our app
module.exports = mongoose.model('Item', itemSchema);