const express =require('express')
const { upload } = require('../../helpers/cloudinary')
const { addCategory, deleteCategory, getCategory, updateCategory } = require( '../../controllers/admin/category-controller');

const router=express.Router();

router.post('/add',upload.single('logo'),addCategory);
router.put('/update/:id',upload.single('logo'),updateCategory);
router.delete('/delete/:id',deleteCategory);
router.get('/list',getCategory)

module.exports = router