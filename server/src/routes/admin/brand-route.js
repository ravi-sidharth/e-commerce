const express = require('express')
const { addBrand, deleteBrand, getBrand, updateBrand } = require('../../controllers/admin/brand-controller');

const router = express.Router() 

router.post('/add',addBrand)
router.put('/update/:id',updateBrand)
router.delete('/delete/:id',deleteBrand)
router.get('/list',getBrand)

module.exports = router 