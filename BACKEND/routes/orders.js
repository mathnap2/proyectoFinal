const express = require('express');
const router = express.Router();
const Order = require('../models/order');
const Product = require('../models/product');
const authMiddleware = require('../middleware/authMiddleware');

// Obtener pedidos del usuario autenticado
router.get('/my-orders', authMiddleware, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener pedidos' });
  }
});

// Crear un nuevo pedido
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { items, total } = req.body;

    console.log("🔵 Pedido recibido (items):", items);
    console.log("🟢 Total recibido:", total);
    console.log("🟡 Usuario desde token:", req.user);

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: 'No hay productos en el pedido' });
    }

    if (!total || total <= 0) {
      return res.status(400).json({ error: 'Total inválido' });
    }

    const fixedItems = items.map(item => ({
      ...item,
      size: Array.isArray(item.size) ? item.size[0] : item.size
    }));
    
    const newOrder = new Order({
      userId: req.user._id,
      items: fixedItems,
      total,
    });
    

    await newOrder.save();

    // Actualizar stock de cada producto comprado
    for (const item of fixedItems) {
      await Product.findByIdAndUpdate(item._id, {
        $inc: { stock: -item.quantity }
      });
    }

    res.status(201).json({ message: 'Pedido creado exitosamente', order: newOrder });
  } catch (error) {
    console.error("❌ ERROR al guardar pedido:", error.message);
    console.error("❌ Stack:", error.stack);
    res.status(500).json({ error: 'Error al crear el pedido' });
  }
});

module.exports = router;
