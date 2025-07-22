const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema(
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      products: [
        {
          product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true,
          },
          quantity: {
            type: Number,
            required: true,
          },
          selectedSize: {
            type: String,
          },
        },
      ],
      addressInfo: {
        address: { type: String, required: true },
        city: { type: String, required: true },
        pincode: { type: String, required: true },
        phone: { type: String, required: true },
        notes: { type: String },
      },
      orderStatus: {
        type: String,
        enum: ["Pending", "Confirmed", "Shipped", "Delivered", "Cancelled"],
        default: "Pending",
      },
      paymentMethod: {
        type: String,
        enum: ["COD", "Razorpay"],
        required: true,
      },
      paymentStatus: {
        type: String,
        enum: ["Pending", "Paid", "Failed"],
        default: "Pending",
      },
      razorpayPaymentId: {
        type: String,
        default: null,
      },
      razorpayOrderId: {
        type: String,
        default: null,
      },
      razorpaySignature: {
        type: String, 
      },
      totalAmount: {
        type: Number,
        required: true,
      },
    },
    { timestamps: true }
  );
module.exports = mongoose.model("Order",orderSchema)