const express =require('express')
const { handleImageUpload, addProduct, updateProductById, deleteProductById, fetchAllProducts } = require('../../controllers/admin/products-controller')
const { upload } = require('../../helpers/cloudinary')

const router = express.Router()

router.post(' ',upload.single('my_file'),handleImageUpload)
router.post('/add',addProduct)
router.get('/get',fetchAllProducts)
router.put('/edit/:id',updateProductById)
router.delete('/delete/:id',deleteProductById)

module.exports = router