const express = require('express');
const router = express.Router();

const productsRoutes = require('./products');

// Ruta agrupada para productos
router.use('/products', productsRoutes);

module.exports = router;
