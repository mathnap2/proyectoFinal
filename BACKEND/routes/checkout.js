const express = require("express");
const Stripe = require("stripe");
const router = express.Router();

const stripe = Stripe(""); //Pegar ahi mi clave



router.post("/create-payment-intent", async (req, res) => {
  try {
    const { amount } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "mxn",
    });

    res.send({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    console.error("Stripe error:", err);
    res.status(500).send({ error: err.message });
  }
});

module.exports = router;
