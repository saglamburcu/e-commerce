const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please enter a name of a product"],
    trim: true,
    maxLength: [20, "Product name is not exceed than 20 characters"]
  },
  description: {
    type: String,
    required: [true, "Please add a description of your product"],
    maxLength: [4000, "Description can not exceed than 4000 characters"]
  },
  price: {
    type: Number,
    required: [true, "Please add a price for your product"],
    maxLength: [8, "Price can not exceed than 8 characters"]
  },
  discountPrice: {
    type: String,
    maxLength: [4, "Discount price can not exceed than 4 characters"]
  },
  color: {
    type: String,
  },
  size: {
    type: String,
  },
  rating: {
    type: Number,
    default: 0
  },
  images: [
    {
      public_id: {
        type: String,
        required: true
      },
      url: {
        type: String,
        required: true
      }
    }
  ],
  category: {
    type: String,
    required: [true, "Please add a category of your product"],
  },
  stock: {
    type: Number,
    required: [true, "Please add some stock for your product"],
    maxLength: [3, "Stock can not exceed than 3 characters"]
  },
  numOfReviews: {
    type: Number,
    default: 0
  },
  reviews: [
    {
      user: {
        type: Schema.ObjectId,
        ref: "User",
        required: true
      },
      name: {
        type: String,
        required: true
      },
      rating: {
        type: Number,
        required: true
      },
      comment: {
        type: String,
      },
      time: {
        type: Date,
        default: Date.now()
      }
    }
  ],
  user: {
    type: Schema.ObjectId,
    ref: "User"
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
})

module.exports = mongoose.model("Product", productSchema)