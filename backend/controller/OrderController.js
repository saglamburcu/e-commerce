const Order = require("../models/OrderModel");
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const updateStock = require("../utils/updateStock");

// Create Order
const createOrder = catchAsyncErrors(async (req, res, next) => {
  const { shippingInfo, orderItems, paymentInfo, itemsPrice, taxPrice, shippingPrice, totalPrice } = req.body;

  const order = await Order.create({
    orderStatus: "İşleme Alındı",
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paidAt: Date.now(),
    user: req.user._id
  });

  if (order.orderStatus === "İşleme Alındı") {
    order.orderItems.forEach(async (ord) => {
      await updateStock(ord.product, ord.quantity);
    });
  };

  await order.save();

  res.status(201).json({
    success: true,
    order
  })
})

// get single order
const getSingleOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  // populate("user", "name email");

  if (!order) {
    return next(new ErrorHandler("Order items not found with this id", 404));
  }

  res.status(200).json({
    success: true,
    order
  })
})

//get all orders
const getAllOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find({ user: req.user._id });

  res.status(200).json({
    success: true,
    orders
  })
})

// get all orders --- Admin
const getAdminAllOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find();

  let totalAmount = 0;

  orders.forEach(order => {
    totalAmount += order.totalPrice;
  })

  res.status(200).json({
    success: true,
    totalAmount,
    orders
  })
})

const updateAdminOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHandler("Order not found with this id", 404));
  };

  if (order.orderStatus === "Teslim edildi") {
    return next(new ErrorHandler("You have already delivered this order", 400));
  };

  // if (req.body.status === "Kargoya verildi") {
  //   order.orderItems.forEach(async (ord) => {
  //     await updateStock(ord.product, ord.quantity);
  //   });
  // };

  order.orderStatus = req.body.status;

  if (req.body.status === "Teslim edildi") {
    order.deliveredAt = Date.now();
  };

  await order.save();

  res.status(200).json({
    success: true
  })
})

// delete order --- Admin
const deleteOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHandler("Order not found with this id", 404));
  };

  await order.remove();

  res.status(200).json({
    success: true
  })
})

module.exports = {
  createOrder,
  getSingleOrder,
  getAllOrders,
  getAdminAllOrders,
  updateAdminOrder,
  deleteOrder
}