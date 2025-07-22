const express = require('express');
const {createOrder,processPayment,fetchAllOrderByUserId,fetchOrderDetailsById ,fetchAllOrder } = require('../../controllers/shop/order-controller');


const router = express.Router();

router.post('/createOrder', createOrder);
router.post('/process-peyment', processPayment);
router.get('/list/:userId', fetchAllOrderByUserId);
router.get('/details/:orderId', fetchOrderDetailsById);
router.get('/list', fetchAllOrder);

module.exports = router;