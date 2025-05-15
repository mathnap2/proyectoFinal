const express = require("express");
const Stripe = require("stripe");
const router = express.Router();
const Product = require("../models/product");

const stripe = Stripe("sk_test_51RMNWGCT5CSGGVxAvvwZYXXE0T6xE22THJ4o4ZOXdUwzySpnU6vwz0OifoyLLc8RiI3Qiio2IWwpqmzE8mHpCE79008OCuzT4x");

router.post("/create-payment-intent", async (req, res) => {
  try {
    const { cart } = req.body; // Esperamos un array con productos { _id, quantity }
     console.log("🛒 Carrito recibido:", req.body);
    if (!cart || !Array.isArray(cart) || cart.length === 0) {
      return res.status(400).json({ error: "Carrito vacío o inválido" });
    }

    // Validar stock para cada producto
    for (const item of cart) {
      const productInDB = await Product.findById(item._id);
      if (!productInDB) {
        return res.status(404).json({ error: `Producto no encontrado: ${item._id}` });
      }
      if (productInDB.stock === 0) {
        return res.status(400).json({ error: `El producto "${productInDB.name}" está agotado.` });
      }
      if (item.quantity > productInDB.stock) {
        return res.status(400).json({ error: `Cantidad solicitada para "${productInDB.name}" excede el stock disponible.` });
      }
    }

    const amount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);


    const amountInCents = Math.round(amount * 100);

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInCents,
      currency: "mxn",
    });

    res.send({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    console.error("Stripe error:", err);
    res.status(500).send({ error: err.message });
  }
});


module.exports = router;