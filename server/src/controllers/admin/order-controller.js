const Order = require("../../models/Order");
const logger = require("../../utils/logger");


const getAllOrdersOfAllUsers = async(req,res) => {
    try {
        const orders = await Order.find({}).sort({createdAt:-1})

        if (!orders.length) {
            return res.status(404).json({
                success:false,
                message:'No orders found!'
            })
        }

        res.status(200).json({
            success : true,
            data : orders
        })
    } catch(err) {
        logger.error(err.message) 
        res.status(500).json({
            success:false,
            message:'Error occured', err
        })
    }
}

const getOrdersDetailsForAdmin = async (req, res) => {
    try {
      const {orderId} = req.params 
  
      const order = await Order.findById(orderId).populate({
        path:'products.product',
        select:'title price salePrice images brand'
    })
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
        error: 'Some error occured', err,
      });
    }
  }


const updateOrderStatus = async(req,res) => {
  try{
    const {orderId} = req.params
    const {orderStatus} = req.body
  
    console.log(orderId,"product id")
    const order = await Order.findById(orderId)
    if(!order) {
      return res.status(400).json({
        success:false,
        message:'Order not found!'
      })
    }

    await Order.findByIdAndUpdate(orderId,{orderStatus})

    res.status(200).json({
      success:true,
      message:'Order status is updated successfully!'
    })
  } catch(err) {
    logger.error(err.message)
    res.status(500).json({
      success:false,
      message:'Some error occured',err
    })
  }
}
module.exports = {
    getAllOrdersOfAllUsers,
    getOrdersDetailsForAdmin,
    updateOrderStatus
}