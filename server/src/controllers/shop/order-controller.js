const Order = require( "../../models/Order.js");
const Cart = require("../../models/Cart.js");
const Product = require("../../models/Product.js");
const razorpay = require("../../helpers/razorpay.js"); 
const crypto = require("crypto");

const processPayment = async (req, res) => {
  try {
    const { totalAmount } = req.body;
    if (!totalAmount) {
      return res.status(403).json({
        success: false,
        message: "totalAmount is required.",
      });
    }
    const options = {
      amount: totalAmount * 100, 
      currency: "INR",
      receipt: Math.random().toString(36).substring(2),
    };

    const razorpayOrder = await razorpay.orders.create(options);

    return res.status(201).json({
      success: true,
      order: razorpayOrder,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

const createOrder = async (req, res) => {
  try {
    const {
      user,
      products,
      addressInfo,
      totalAmount,
      paymentMethod,
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = req.body;
    if (!user || !products || !addressInfo || !totalAmount || !paymentMethod) {
      return res.status(403).json({
        success: false,
        message: "Invalid data provided.",
      });
    }

    if (paymentMethod === "COD") {
      const order = new Order({
        user,
        products,
        addressInfo,
        totalAmount,
        paymentMethod,
      });

      for (let item of products) {
        const product = await Product.findById(item.product);
        if (!product) {
          return res.status(404).json({
            success: false,
            message: "not enough stock for this product.",
          });
        }
        product.stock -= item.quantity;
        await product.save();
      }
      await order.save();
      await Cart.deleteOne({ user });
      return res
        .status(201)
        .json({ success: true, message: "COD Order Placed Successfully!" });
    } else if (paymentMethod === "Razorpay") {
      if (
        !user ||
        !products ||
        !addressInfo ||
        !totalAmount ||
        !paymentMethod ||
        !razorpay_order_id ||
        !razorpay_payment_id ||
        !razorpay_signature
      ) {
        return res.status(403).json({
          success: false,
          message: "Invalid data provided.",
        });
      }
      const body = razorpay_order_id + "|" + razorpay_payment_id;
      const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_API_SECRET)
        .update(body.toString())
        .digest("hex");
      if (expectedSignature === razorpay_signature) {
        const order = new Order({
          user,
          products,
          addressInfo,
          totalAmount,
          paymentMethod,
          paymentStatus: "Paid",
          razorpayPaymentId: razorpay_payment_id,
          razorpayOrderId: razorpay_order_id,
          razorpaySignature: razorpay_signature,
        });

        for (let item of products) {
          const product = await Product.findById(item.product);
          if (!product) {
            return res.status(404).json({
              success: false,
              message: "not enough stock for this product.",
            });
          }
          product.stock -= item.quantity;
          await product.save();
        }
        await order.save();
        await Cart.deleteOne({ user });
        return res
          .status(201)
          .json({ success: true, message: "Order Placed Successfully!" });
      } else {
        return res
          .status(201)
          .json({ success: false, message: "Order failed!" });
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

const fetchAllOrderByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return res.status(404).json({
        success: false,
        message: "User id is required.",
      });
    }
    const order = await Order.find({ user: userId }).sort({ _id: -1 });

    return res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    console.error("Fetch all order error", error);
    res.status(500).json({
      success: false,
      message: "Internal erver error.",
    });
  }
};

const fetchOrderDetailsById = async (req, res) => {
  try {
    const { orderId } = req.params;
    if (!orderId) {
      return res.status(404).json({
        success: false,
        message: "Order id is required.",
      });
    }
    const orderDetails = await Order.findOne({ _id: orderId }).populate({
      path: "products.product",
      select: "title price salePrice images brand",
    });
    return res.status(200).json({
      success: true,
      orderDetails,
    });
  } catch (error) {
    console.error("Fetch all order error", error);
    res.status(500).json({
      success: false,
      message: "Internal erver error.",
    });
  }
};

const fetchAllOrder = async (req, res) => {
  try {
    const order = await Order.find().sort({ _id: -1 });
    return res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    console.error("Fetch all order error", error);
    res.status(500).json({
      success: false,
      message: "Internal erver error.",
    });
  }
};

module.exports = {
  processPayment,
  createOrder,
  fetchAllOrderByUserId,
  fetchOrderDetailsById,
  fetchAllOrder
};
