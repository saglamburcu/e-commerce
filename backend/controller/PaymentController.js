// const catchAsyncErrors = require("../middleware/catchAsyncErrors");

// const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// const processPayment = catchAsyncErrors(async (req, res, next) => {
//   const myPayment = await stripe.paymentIntents.create({
//     amount: 2000,
//     currency: "usd",
//     payment_method_types: ['card'],
//     metadata: {
//       name: "value"
//     }
//   });

//   const client_secret = myPayment.client_secret;

//   res.status(200).json({
//     success: true,
//     message: "Payment initiated successfully",
//     client_secret
//   })
// })

// const sendStripeApiKey = catchAsyncErrors(async (req, res, next) => {
//   res.status(200).json({
//     stripeApiKey: process.env.NEXT_PUBLIC_STRIPE_API_KEY
//   })
// })

// module.exports = {
//   processPayment,
//   sendStripeApiKey
// }