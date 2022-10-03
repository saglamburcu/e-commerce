const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const orderSchema = new Schema({
  shippingInfo: {
    address: {
      type: String,
      require: true
    },
    city: {
      type: String,
      require: true
    },
    state: {
      type: String,
      require: true
    },
    country: {
      type: String,
      require: true
    },
    pinCode: {
      type: Number,
      // require: true
    }
  },
  orderItems: [
    {
      name: {
        type: String,
        required: true
      },
      price: {
        type: Number,
        required: true
      },
      quantity: {
        type: Number,
        required: true
      },
      image: {
        type: String,
        required: true
      },
      product: {
        type: Schema.ObjectId,
        ref: "Product",
        required: true
      }
    }
  ],
  user: {
    type: Schema.ObjectId,
    ref: "User",
    required: true
  },
  paymentInfo: {
    id: {
      type: String,
      required: true
    },
    status: {
      type: String,
      required: true
    }
  },
  paidAt: {
    type: Date,
    required: true
  },
  itemsPrice: {
    type: Number,
    required: true,
    default: 0
  },
  taxPrice: {
    type: Number,
    required: true,
    default: 0
  },
  shippingPrice: {
    type: Number,
    required: true,
    default: 0
  },
  totalPrice: {
    type: Number,
    required: true,
    default: 0
  },
  orderStatus: {
    type: String,
    required: true,
    default: "Processing"
  },
  deliveredAt: Date,
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model("Order", orderSchema);