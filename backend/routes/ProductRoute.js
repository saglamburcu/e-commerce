const express = require("express");
const { getAllProducts, createProduct } = require("../controller/ProductController");

const router = express.Router();

router.get("/products", getAllProducts);
router.post("/product/new", createProduct);

module.exports = router;