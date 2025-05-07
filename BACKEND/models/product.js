const mongoose = require('mongoose');

let productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    availability: {
        type: Boolean,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    size: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        default: 1
    },
    dateUploaded: {
        type: Date,
        required: true
    },
    
    timesSold: {
        type: Number,
        required: true,
        default: 0
    }
});

module.exports = mongoose.model('products', productSchema);