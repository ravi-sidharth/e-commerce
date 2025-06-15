const express = require('express')
const { getAllOrdersOfAllUsers,getOrdersDetailsForAdmin } = require("../../controllers/admin/order-controller");

const router = express.Router()

router.get('/get',getAllOrdersOfAllUsers)
router.get('/details/:id',getOrdersDetailsForAdmin)

module.exports = router 

