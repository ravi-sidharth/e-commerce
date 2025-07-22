const express =require('express')
const { addProduct, deleteProduct, getProducts, updateProduct, handleImageUpload } = require('../../controllers/admin/products-controller.js');
const { upload } = require('../../helpers/cloudinary')

const router = express.Router()

router.post('/upload-image',upload.single('file'), handleImageUpload);
router.post('/add', upload.array('images', 4), addProduct);
router.put('/update/:id', upload.array('images', 4), updateProduct);
router.delete('/delete/:id', deleteProduct);
router.get('/list', getProducts);

module.exports = router 