const Product = require("../models/ProductModel");

const updateStock = async (id, quantity) => {
  const product = await Product.findById(id);

  product.stock -= quantity;

  await product.save();
}

module.exports = updateStock;