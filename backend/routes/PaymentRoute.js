const express = require("express");
const { processPayment } = require("../controller/PaymentController");
const { isAuthenticatedUser } = require("../middleware/auth");

const router = express.Router();

router.post("/payment/process", processPayment);

module.exports = router;