const logger = require('../../utils/logger');
const paypal = require('../../helpers/paypal');
const Order = require('../../models/Order');
const Cart = require('../../models/Cart')
const Product = require('../../models/Product')


const createOrder = async (req, res) => {
  try {
    const {
      userId,
      cartId,
      cartItems,
      addressInfo,
      orderStatus,
      paymentMethod,
      paymentStatus,
      totalAmount,
      orderDate,
      orderUpdateDate,
    } = req.body;

    const returnUrl = `${process.env.CLIENT_URL}/shop/paypal-return`
    const cancelUrl =  `${process.env.CLIENT_URL}/shop.paypal-cancel`

    const paypalOrder = await paypal.createOrder(cartItems, totalAmount, returnUrl, cancelUrl);
    const approvalURL = paypalOrder.links.find(link => link.rel === 'approve').href;

    const newlyCreatedOrder = new Order({
      userId,
      cartId,
      cartItems,
      addressInfo,
      orderStatus,
      paymentMethod,
      paymentStatus,
      totalAmount,
      orderDate,
      orderUpdateDate,
      paypalOrderId: paypalOrder.id,
    });
    await newlyCreatedOrder.save();

    res.status(201).json({
      success: true,
      approvalURL,
      orderId: newlyCreatedOrder._id,
    });
  } catch (err) {
    if (err.response && err.response.data) {
      logger.error('PayPal error:', err.response.data);
    } else {
      logger.error(err.message);
    }
    res.status(500).json({
      success: false,
      message: 'Some error occurred',
      err: err.response && err.response.data ? err.response.data : err,
    });
  }
};

const capturePayment = async (req, res) => {
  try {
    const { paymentId, payerId, orderId } = req.body;

    let order = await Order.findById(orderId)
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order can not be found!'
      })
    }

    order.paymentStatus = 'Paid'
    order.orderStatus = 'Confirmed'
    order.paymentId = paymentId
    order.payerId = payerId

    for (let item of order.cartItems) {
      let product = await Product.findById(item?.productId)

      if (!product) {
        return res.status(404).json({
          success:false,
          message:`Not enough stock for this product ${product.title}`
        })
      }

      product.totalStock -= item.quantity 

      await product.save()
    }

    // delete the existing cart item after purchasing the item
    const getCartId = order.cartId
    await Cart.findByIdAndDelete(getCartId)

    await order.save()

    // second option to update the order
    // await Order.findByIdAndUpdate(orderId, {
    //   paymentStatus: 'Paid',
    //   orderStatus: 'Confirmed',
    //   paymentId: paymentId,
    //   payerId :payerId
    // });

    // const captureResult = await paypal.captureOrder(order?.paypalOrderId);

    res.status(200).json({
      success: true,
      message: 'Payment captured successfully',
      data: order,
    });

  } catch (err) {
    logger.error(err.message);
    res.status(500).json({
      success: false,
      error: err.response && err.response.data ? err.response.data : err,
    });
  }
};

const getAllOrdersByUser = async (req, res) => {
  try {
    const {userId} = req.params

    const orders =await Order.find({userId})

    if (!orders.length) {
      return res.status(404).json({
        success:false,
        message:'No order found!'
      })
    }

    res.status(200).json({
      success:true,
      data:orders
    })

  } catch (err) {
    logger.error(err.message);
    res.status(500).json({
      success: false,
      error: err.response && err.response.data ? err.response.data : err,
    });
  }
}

const getOrdersDetail = async (req, res) => {
  try {
    const {id} = req.params 

    const order = await Order.findById(id)
    if(!order) {
      return res.status(404).json({
        success:false,
        message:'Order not found!'
      })
    }

    res.status(200).json({
      success:true,
      data : order
    })
  } catch (err) {
    logger.error(err.message);
    res.status(500).json({
      success: false,
      error: err.response && err.response.data ? err.response.data : err,
    });
  }
}

module.exports = {
  createOrder,
  capturePayment,
  getAllOrdersByUser,
  getOrdersDetail
};
