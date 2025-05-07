const Product = require('../models/product');

exports.createProduct = (req, res) => {
    let product = new Product(req.body);
    product.save()
        .then(doc => res.send(doc))
        .catch(err => res.status(400).send(err));
};

exports.getAllProducts = (req, res) => {
    Product.find()
        .then(docs => res.send(docs))
        .catch(err => res.status(400).send(err));
};

exports.getProductById = (req, res) => {
    Product.findById(req.params.id)
        .then(doc => res.send(doc))
        .catch(err => res.status(400).send(err));
};

exports.updateProduct = (req, res) => {
    Product.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(doc => res.send(doc))
        .catch(err => res.status(400).send(err));
};

exports.deleteProduct = (req, res) => {
    Product.findByIdAndDelete(req.params.id)
        .then(doc => res.send({ mensaje: "Producto eliminado", doc }))
        .catch(err => res.status(400).send(err));
};
