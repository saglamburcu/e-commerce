const User = require("../models/UserModel");
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const sendToken = require("../utils/jwtToken");
const sendMail = require("../utils/sendMail");

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

  sendToken(user, 201, res);
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

  sendToken(user, 201, res);
})

// logout
const logoutUser = catchAsyncErrors(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true
  });

  res.status(200).json({
    success: true,
    message: "Logout success"
  })
})

// Forgot password
const forgotPassword = catchAsyncErrors(async (req, res, next) => {
  const resetEmail = req.body.email;

  const user = await User.findOne({ email: resetEmail });

  if (!user) {
    return next(new ErrorHandler("User not found with this email", 404));
  }

  const resetPasswordToken = user.getResetPasswordToken();

  await user.save(); // Save to database

  const resetPasswordUrl = `http://localhost:4000/api/password/reset?resetPasswordToken=${resetPasswordToken}`;

  const message = `Your password reset token is : ${resetPasswordUrl}`;

  try {
    await sendMail({
      from: process.env.SMTP_USER,
      to: resetEmail,
      subject: "Reset your password",
      html: message
    });

    res.status(200).json({
      success: true,
      message: `Email sent to ${resetEmail} successfully`,
    })

  } catch (err) {
    user.resetPasswordToken = undefined;
    user.resetPasswordTime = undefined;

    await user.save();

    console.log(err)
    return next(new ErrorHandler(err.message, 500));
  }
})

// Reset password
const resetPassword = catchAsyncErrors(async (req, res, next) => {
  const { resetPasswordToken } = req.query;

  const { password } = req.body;

  if (!resetPasswordToken) {
    return next(new ErrorHandler("Please provide a valid token", 400));
  };

  const user = await User.findOne({
    resetPasswordToken: resetPasswordToken,
    resetPasswordTime: { $gt: Date.now() }
  });

  if (!user) {
    return next(new ErrorHandler("Invalid Token or session expired", 404));
  }

  user.password = password;
  user.resetPasswordToken = undefined;
  user.resetPasswordTime = undefined;

  await user.save();

  res.status(200).json({
    status: "success",
    message: "Reset password process successfull"
  });
})

module.exports = {
  createUser,
  loginUser,
  logoutUser,
  forgotPassword,
  resetPassword
}