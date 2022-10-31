const express = require("express");
const { getAllProducts, createProduct, updateProduct, deleteProduct, getProductDetail, createProductReview, getSingleProductReviews, deleteReview, getAllCategories, getAdminProducts } = require("../controller/ProductController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router.get("/products", getAllProducts);
router.get("/categories", getAllCategories);
router.get("/products/admin", isAuthenticatedUser, authorizeRoles("admin"), getAdminProducts);
router.post("/product/new", isAuthenticatedUser, authorizeRoles("admin"), createProduct);
router.put("/product/:id", isAuthenticatedUser, authorizeRoles("admin"), updateProduct);
router.delete("/product/:id", isAuthenticatedUser, authorizeRoles("admin"), deleteProduct);
router.get("/product/:id", getProductDetail);
router.post("/product/review", isAuthenticatedUser, createProductReview);
router.get("/reviews", getSingleProductReviews);
router.delete("/delete/review", isAuthenticatedUser, authorizeRoles("admin"), deleteReview);

module.exports = router;