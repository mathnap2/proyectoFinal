function createProduct(title, description, availability, stock, size, price) {
    let product = new Product(title, description, availability, stock, size, price);
    data.products.push(product);
}

function getProductById(id) {
    let product = data.products.find(product => product.id === id);
    if (!product) {
        throw new ProductException("404 - Product not found");
    }
    return product;
}

function searchProducts(attribute, value) {
    if (!Product.prototype.hasOwnProperty(attribute)) {
        throw new ProductException("Attribute " + attribute + " does not exist");
    }

    return data.products.filter(product => {
        const productValue = product[attribute];

        if (typeof productValue === "string") {
            return productValue.includes(value);
        }

        if (attribute === "date_uploaded") {
            return new Date(productValue).toDateString() === new Date(value).toDateString();
        }

        return productValue === value;
    });
}

function getAllProducts() {
    return data.products;
}

function updateProduct(id, obj_new_info) {
    const product = data.products.find(product => product.id === id);
    if (!product) {
        throw new ProductException("Product with ID " + id + " not found");
    }

    let updated = false;
    for (let key in obj_new_info) {
        if (key in product) {
            product[key] = obj_new_info[key];
            updated = true;
        }
    }

    if (!updated) {
        throw new ProductException("No valid attributes");
    }
    return updated;
}

function deleteProduct(id) {
    const productIndex = data.products.findIndex(product => product.id === id);
    if (productIndex === -1) {
        throw new ProductException("Product with ID " + id + " not found");
    }
    data.products.splice(productIndex, 1);
}