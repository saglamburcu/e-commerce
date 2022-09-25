const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please enter your name"],
    minLength: [2, "Please enter a name at least 2 characters"],
    maxLength: [15, "Name can not big than 15 characters"]
  },
  email: {
    type: String,
    required: [true, "Please enter your email"],
    validate: [validator.isEmail, "Please enter a valid email"],
    unique: true
  },
  password: {
    type: String,
    required: [true, "Please enter your password"],
    minLength: [8, "Password should be greater than 8 characters"],
    select: false
  },
  avatar: {
    public_id: {
      type: String,
      required: true
    },
    url: {
      type: String,
      required: true
    },
  },
  role: {
    type: String,
    default: "user"
  },
  resetPasswordToken: {
    type: String
  },
  resetPasswordTime: {
    type: Date
  }
});

// Hash password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next()
  };

  this.password = await bcrypt.hash(this.password, 10);
});

// JWT token
userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES
  })
};

// Compare password
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}

// Forgot password
userSchema.methods.getResetPasswordToken = function () {
  const randomHexString = crypto.randomBytes(20).toString("hex");  // Generating token

  // hashing and adding resetPasswordToken to userSchema
  const resetPasswordToken = crypto.createHash("sha256").update(randomHexString).digest("hex");

  this.resetPasswordToken = resetPasswordToken;
  this.resetPasswordTime = Date.now() + (15 * 60 * 1000);

  return resetPasswordToken;
}

module.exports = mongoose.model("User", userSchema);