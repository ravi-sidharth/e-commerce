const logger = require('../../utils/logger')
const paypal = require('../../helpers/paypal')
const Order = require('../../models/Order')

const createOrder = async (req, res) => {
    try {
        const {
            userId,
            cartItems,
            addressInfo,
            orderStatus,
            paymentMethod,
            paymentStatus,
            totalAmount,
            orderDate,
            orderUpdateDate,
            paymentId,
            payerId
        } = req.body

        const create_payment_json = {
            intent: 'sale',
            payer: {
                payment_method: 'paypal'
            },
            redirect_urls: {
                return_url: process.env.RETURN_URL,
                cancel_url: process.env.CANCEL_URL
            },
            transactions: [
                {
                    item_list: {
                        items: cartItems.map(item => ({
                            name: item.title,
                            sku: item.productId,
                            price: item.price.toFixed(2),
                            currency: 'USD',
                            quantity: item.quantity
                        }))
                    },
                    amount: {
                        currency: 'USD',
                        total: totalAmount.toFixed(2)
                    },
                    description: 'description'
                }
            ]
        }

        paypal.payment.create(create_payment_json, async (error, paymentInfo) => {
            if (error) {
                logger.error(error)
                return res.status(500).json({
                    success: false,
                    message: 'Error occured while creating paypal payment'
                })
            } else {
                const newlyCreatedOrder = new Order({
                    userId,
                    cartItems,
                    addressInfo,
                    orderStatus,
                    paymentMethod,
                    paymentStatus,
                    totalAmount,
                    orderDate,
                    orderUpdateDate,
                    paymentId,
                    payerId
                })

                await newlyCreatedOrder.save()

                const approvalURL = paymentInfo.links.find(link => link.rel === 'approval_url').href

                res.status(201).json({
                    success:true,
                    approvalURL,
                    orderId : newlyCreatedOrder._id  
                })


            }
        })

    } catch (err) {
        logger.error(err.message)
        res.status(500).json({
            success: false,
            message: 'Some error occured', err
        })
    }
}


const capturePayment = async (req, res) => {
    try {


    } catch (err) {
        logger.error(err.message)
        res.status(500).json({
            success: false,
            message: 'Some error occured', err
        })
    }
}


module.exports = {
    createOrder,
    capturePayment
}