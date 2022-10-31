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

// get all products -- Admin
const getAdminProducts = catchAsyncErrors(async (req, res, next) => {
  const products = await Product.find();

  res
    .status(200).
    json({
      success: true,
      products
    })
})

// get all products
const getAllProducts = catchAsyncErrors(async (req, res) => {

  const pageLimit = 8;

  /*
  let category = req.query.category || "All";

  category === "All"
    ? (category = [...categories])
    : (category = req.query.category.split(","));

  */
  const productsCount = await Product.countDocuments(/*{
    category: { $in: [...category] },
  }*/);

  //const totalPage = Math.ceil(productsCount / pageLimit);

  const feature = new Features(Product.find(), req.query).search().filter().pagination(pageLimit);

  const products = await feature.query;

  res.status(200)
    .json({
      success: true,
      products,
      pageLimit,
      productsCount
    })
})

// get all categories
const getAllCategories = catchAsyncErrors(async (req, res) => {

  const categories = await Product.find().distinct('category');

  res
    .status(200)
    .json([...categories]);
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

// create new review and update the review
const createProductReview = catchAsyncErrors(async (req, res, next) => {
  const { productId, comment, rating } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment
  };

  const product = await Product.findById(productId);

  const isReviewed = product.reviews.find((rev) => rev.user.toString() === review.user.toString());

  if (isReviewed) {
    product.reviews.forEach((rev) => {
      if (rev.user.toString() === review.user.toString()) {
        rev.rating = rating;
        rev.comment = comment;
      }
    })
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }

  let avg = 0;

  product.reviews.forEach((rev) => {
    avg += rev.rating;
  });

  product.rating = avg / product.reviews.length;

  await product.save();

  res.status(200).json({
    success: true
  })

})

// Get all reviews of a single product
const getSingleProductReviews = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.id);

  if (!product) {
    return next(new ErrorHandler("Product is not found with this id", 404));
  }

  res.status(200).json({
    success: true,
    reviews: product.reviews
  })
})

// Delete review -- Admin
const deleteReview = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);

  if (!product) {
    return next(new ErrorHandler("Product is not found with this id", 404));
  }

  const reviews = product.reviews.filter(rev => rev._id.toString() !== req.query.id.toString());

  let avg = 0;

  reviews.forEach(rev => {
    avg += rev.rating;
  });

  let rating = 0;

  if (reviews.length === 0) {
    rating = 0;
  } else {
    rating = avg / reviews.length;
  };

  const numOfReviews = reviews.length;

  await Product.findByIdAndUpdate(req.query.productId, { reviews, rating, numOfReviews }, {
    new: true,
    runValidators: true,
    useFindAndModify: false
  });

  res.status(200).json({
    success: true,
    message: "Review is deleted successfully"
  });
})

module.exports = {
  getAllProducts,
  getAdminProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetail,
  createProductReview,
  getSingleProductReviews,
  deleteReview,
  getAllCategories,
}