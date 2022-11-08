const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const stripe = require("stripe");

const processPayment = catchAsyncErrors(async (req, res, next) => {
  const total = req.body.amount;
  console.log("Payment Request recieved for this ruppess", total);

  const payment = await stripe(process.env.STRIPE_SECRET_KEY).paymentIntents.create({
    amount: total * 100,
    currency: "try",
  });

  res.status(201).send({
    clientSecret: payment.client_secret,
  });
})


module.exports = {
  processPayment
}