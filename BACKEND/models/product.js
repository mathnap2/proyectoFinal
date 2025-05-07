const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    availability: { type: Boolean, required: true },
    stock: { type: Number, required: true },
    size: { type: String, required: true },
    price: { type: String, required: true, default: 1 },
    dateUploaded: { type: Date, required: true },
    timesSold: { type: String, required: true, default: 0 }
});

module.exports = mongoose.model('Product', productSchema);
