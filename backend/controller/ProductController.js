const Product = require("../models/ProductModel");
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Features = require("../utils/Features");

// create product -- Admin
const createProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.create(req.body);

  res
    .status(201)
    .json({
      success: true,
      product
    })
})

// get all products
const getAllProducts = catchAsyncErrors(async (req, res) => {

  const pageLimit = 8;

  const feature = new Features(Product.find(), req.query).search().filter().pagination(pageLimit);

  const products = await feature.query;

  res
    .status(200)
    .json({
      success: true,
      products
    })
})

// update product -- Admin
const updateProduct = catchAsyncErrors(async (req, res, next) => {
  let product = await Product.findById(req.params.id)

  if (!product) {
    return next(new ErrorHandler("Product is not found with this id", 404));
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useUnified: false
  })

  res.status(200).json({
    success: true,
    product
  })
})

// delete product -- Admin
const deleteProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product is not found with this id", 404))
  }

  await product.remove();

  res.status(200).json({
    success: true,
    message: "Product deleted successfully"
  })
})

// single product detail
const getProductDetail = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product is not found with this id", 404));
  }

  res.status(200).json({
    success: true,
    product
  })
})

module.exports = {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetail
}