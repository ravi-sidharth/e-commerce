const express = require('express')
const { searchProduct } = require('../../controllers/shop/search-controller')


const router = express.Router()

router.get('/:keyword',searchProduct)

module.exports = router