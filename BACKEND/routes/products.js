const express = require('express');
const router = express.Router();
const Product = require('../models/product');

// Crear producto
router.post('/', (req, res) => {
    let product = new Product(req.body);
    product.save()
        .then(doc => res.send(doc))
        .catch(err => res.status(400).send(err));
});

// Leer todos los productos
router.get('/', (req, res) => {
    Product.find()
        .then(docs => res.send(docs))
        .catch(err => res.status(400).send(err));
});

// Leer un producto por ID
router.get('/:id', (req, res) => {
    Product.findById(req.params.id)
        .then(doc => res.send(doc))
        .catch(err => res.status(400).send(err));
});

// Actualizar producto
router.put('/:id', (req, res) => {
    Product.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(doc => res.send(doc))
        .catch(err => res.status(400).send(err));
});

// Eliminar producto
router.delete('/:id', (req, res) => {
    Product.findByIdAndDelete(req.params.id)
        .then(doc => res.send({ mensaje: "Producto eliminado", doc }))
        .catch(err => res.status(400).send(err));
});

module.exports = router;
