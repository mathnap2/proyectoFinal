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
        type: [String],
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
    },

    imageUrl: {
        type: String,
        required: true,
        default: "https://fanatics.frgimages.com/new-york-yankees/mens-nike-aaron-judge-white-new-york-yankees-home-replica-player-name-jersey_pi3592000_altimages_ff_3592645-11960f417ba69ff98eccalt2_full.jpg?_hv=2&w=900"
    }
});

module.exports = mongoose.model('products', productSchema);