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

//PARA LA FECHA QUE SE SUBE UN DIA ANTES

// router.post('/', (req, res) => {
//     const product = new Product({
//         ...req.body,
//         dateUploaded: new Date() // esto asegura la fecha en la hora local del servidor
//     });

//     product.save()
//         .then(doc => res.send(doc))
//         .catch(err => res.status(400).send(err));
// });


// Leer todos los productos
router.get('/', (req, res) => {
    Product.find()
        .then(docs => res.send(docs))
        .catch(err => res.status(400).send(err));
});

// Filtrar productos
router.get('/filter', async (req, res) => {
    const { size, availability, name, minPrice, maxPrice, dateUploaded } = req.query;
    const filter = {};

    if (size) {
        if (size.includes(',')) {
            filter.size = { $in: size.split(',') };
        } else {
            filter.size = size;
        }
    }
    
    if (availability !== undefined) filter.availability = availability === 'true';
    if (name) filter.name = { $regex: name, $options: 'i' };

    if (minPrice || maxPrice) {
        filter.price = {};
        if (minPrice) filter.price.$gte = parseFloat(minPrice);
        if (maxPrice) filter.price.$lte = parseFloat(maxPrice);
    }

    if (dateUploaded) {
        const date = new Date(dateUploaded);
        const nextDate = new Date(date);
        nextDate.setDate(date.getDate() + 1);
        filter.dateUploaded = { $gte: date, $lt: nextDate };
    }

    try {
        const products = await Product.find(filter);
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: 'Error al filtrar productos' });
    }
});

router.get('/max-price', async (req, res) => {
    try {
      const maxProduct = await Product.findOne().sort({ price: -1 }).select('price');
      res.json({ maxPrice: maxProduct?.price ?? 0 }); // 👈 Evita que sea undefined
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener el precio máximo' });
    }
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
