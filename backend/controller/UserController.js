const User = require("../models/UserModel");
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

// register
const createUser = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: "https://test.com",
      url: "https://test.com"
    }
  });

  const token = user.getJWTToken();

  res.status(201).json({
    success: true,
    token,
    user
  })
});

// login
const loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler("Please enter your email and password", 400))
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHandler("User is not found with this email and password", 401));
  }

  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("User is not found with this email and password", 401));
  }

  const token = user.getJWTToken();

  res.status(201).json({
    success: true,
    token
  })

})

module.exports = {
  createUser,
  loginUser
}