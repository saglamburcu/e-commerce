const express = require("express");
const { processPayment, sendStripeApiKey } = require("../controller/PaymentController");
const { isAuthenticatedUser } = require("../middleware/auth");

const router = express.Router();

router.post("/payment/process", isAuthenticatedUser, processPayment);
router.get("/stripeapikey", isAuthenticatedUser, sendStripeApiKey);

module.exports = router;