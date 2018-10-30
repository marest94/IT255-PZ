const router = require("express").Router();
const stripe = require("stripe")("sk_test_XjzNSNk6wRDgwFCMEovjwmtI");

const Order = require("../models/order");

const checkJWT = require("../middlewares/check-jwt");

router.post("/", checkJWT, (req, res, next) => {
  const stripeToken = req.body.stripeToken;
  const currentCharges = Math.round(req.body.totalPrice * 100);

  stripe.customers
    .create({
      source: stripeToken.id
    })
    .then(function(customer) {
      return stripe.charges.create({
        amount: currentCharges,
        currency: "usd",
        customer: customer.id
      });
    })
    .then(function(charge) {
      const products = req.body.products;

      let order = new Order();
      order.owner = req.decoded.user._id;
      order.totalPrice = currentCharges;

      products.map(product => {
        order.products.push({
          product: product.product,
          quantity: product.quantity
        });
      });

      order.save();
      res.json({
        success: true,
        message: "Successfully made a payment"
      });
    });
});

module.exports = router;
