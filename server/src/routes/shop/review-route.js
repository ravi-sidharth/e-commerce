const express = require('express')
const {addProductReview, getProductReview} = require('../../controllers/shop/product-review-controller')

const router = express.Router()

router.post('/create',addProductReview)
router.get('/list/:productId/:limitValue', getProductReview)

module.exports = router