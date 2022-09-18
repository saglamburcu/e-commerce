const express = require("express");
const { getAllProducts, createProduct, updateProduct, deleteProduct, getProductDetail, createProductReview } = require("../controller/ProductController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router.get("/products", getAllProducts);
router.post("/product/new", isAuthenticatedUser, authorizeRoles("admin"), createProduct);
router.put("/product/:id", isAuthenticatedUser, authorizeRoles("admin"), updateProduct);
router.delete("/product/:id", isAuthenticatedUser, authorizeRoles("admin"), deleteProduct);
router.get("/product/:id", getProductDetail);
router.post("/product/review", isAuthenticatedUser, createProductReview);

module.exports = router;