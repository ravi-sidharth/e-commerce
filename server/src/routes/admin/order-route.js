const express = require('express')
const { getAllOrdersOfAllUsers,getOrdersDetailsForAdmin, updateOrderStatus } = require("../../controllers/admin/order-controller");

const router = express.Router()

router.get('/list',getAllOrdersOfAllUsers)
router.get('/details/:orderId',getOrdersDetailsForAdmin)
router.put('/update/:orderId',updateOrderStatus)

module.exports = router 

