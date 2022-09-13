const Product = require("../models/ProductModel");

// create product
const createProduct = async (req, res) => {
  const product = await Product.create(req.body);

  res
    .status(201)
    .json({
      success: true,
      product
    })
}

// get all products
const getAllProducts = async (req, res) => {
  const products = await Product.find();

  res
    .status(200)
    .json({
      success: true,
      products
    })
}

module.exports = {
  getAllProducts,
  createProduct
}