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

// function getNextProductID() {
//     return data.products.length + 1;
// }

// class ProductException {
//     constructor(errorMessage) {
//         this.errorMessage = errorMessage;
//     }
// }

// class Product {
//     #id;
//     #title;
//     #description;
//     #availability;
//     #stock;
//     #size;
//     #price;
//     #date_uploaded;
//     #times_sold;

//     constructor(title, description, availability, stock, size, price) {
//         this.#id = getNextProductID();
//         this.title = title;
//         this.description = description;
//         this.availability = availability;
//         this.stock = stock;
//         this.size = size;
//         this.price = price;
//         this.#date_uploaded = new Date();
//         this.#times_sold = 0;
//     }

//     get id() {
//         return this.#id;
//     }
//     set id(value) {
//         throw new ProductException("IDs cannot be modified");
//     }

//     get title() {
//         return this.#title;
//     }
//     set title(value) {
//         if (value === "") {
//             throw new ProductException("Title cannot be empty");
//         }
//         this.#title = value;
//     }

//     get description() {
//         return this.#description;
//     }
//     set description(value) {
//         this.#description = value;
//     }

//     get availability() {
//         return this.#availability;
//     }
//     set availability(value) {
//         if (typeof value !== "boolean") {
//             throw new ProductException("Availability must be true or false");
//         }
//         this.#availability = value;
//     }

//     get stock() {
//         return this.#stock;
//     }
//     set stock(value) {
//         if (!Number.isInteger(value) || value < 0) {
//             throw new ProductException("Stock must be a non-negative integer");
//         }
//         this.#stock = value;
//     }

//     get size() {
//         return this.#size;
//     }
//     set size(value) {
//         if (value === "") {
//             throw new ProductException("Size cannot be empty");
//         }
//         this.#size = value;
//     }

//     get price() {
//         return this.#price;
//     }
//     set price(value) {
//         if (typeof value !== "number" || value < 0) {
//             throw new ProductException("Price must be a non-negative number");
//         }
//         this.#price = value;
//     }

//     get date_uploaded() {
//         return this.#date_uploaded;
//     }
//     set date_uploaded(value) {
//         throw new ProductException("Date_uploaded cannot be modified");
//     }

//     get times_sold() {
//         return this.#times_sold;
//     }
//     set times_sold(value) {
//         if (!Number.isInteger(value) || value < 0) {
//             throw new ProductException("Times_sold must be a non-negative integer");
//         }
//         this.#times_sold = value;
//     }
// }