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

  const { password, confirmPassword } = req.body;

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

  if (password !== confirmPassword) {
    return next(new ErrorHandler("Passwords is not matched", 400));
  }

  user.password = password;
  user.resetPasswordToken = undefined;
  user.resetPasswordTime = undefined;

  await user.save();

  sendToken(user, 200, res);
})

// Get user details
const userDetails = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    user
  })
})

// Update password
const updatePassword = catchAsyncErrors(async (req, res, next) => {
  const { oldPassword, newPassword, confirmPassword } = req.body;

  const user = await User.findById(req.user.id).select("+password");

  const isPasswordMatched = await user.comparePassword(oldPassword);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Old password is incorrect"));
  };

  if (newPassword !== confirmPassword) {
    return next(new ErrorHandler("Passwords is not matched", 400));
  };

  user.password = newPassword;

  await user.save();

  sendToken(user, 200, res);

})

// Update User Profile
const updateProfile = catchAsyncErrors(async (req, res, next) => {
  const { name, email } = req.body;

  const newUserData = {
    name,
    email
  }

  const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false
  });

  res.status(200).json({
    success: true,
    message: "Your profile is updated successfully"
  })
})

// Get All Users --- Admin
const getAllUsers = catchAsyncErrors(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    success: true,
    users
  })
})

// Get Single User Details --- Admin
const getSingleUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new ErrorHandler("User is not found with this id", 400))
  }

  res.status(200).json({
    success: true,
    user
  })
})

// Change User Role
const updateUserRole = catchAsyncErrors(async (req, res, next) => {
  const { name, email, role } = req.body;

  const newUserData = {
    name,
    email,
    role
  }

  const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false
  });

  res.status(200).json({
    success: true,
    user
  })
})

// Delete User
const deleteUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new ErrorHandler("User is not found with this id", 400))
  }

  await user.remove();

  res.status(200).json({
    success: true,
    message: "User is deleted successfully"
  })
})

module.exports = {
  createUser,
  loginUser,
  logoutUser,
  forgotPassword,
  resetPassword,
  userDetails,
  updatePassword,
  updateProfile,
  getAllUsers,
  getSingleUser,
  updateUserRole,
  deleteUser
}